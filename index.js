const fs = require('fs-extra');
const { config } = require('./config.js');
const puppeteer = require('puppeteer');
const looksSame = require('looks-same');

const out = './out';
const pconfig = {headless: true, defaultViewport: { width: 1280, height: 768 }, args: ['--window-size=1280,768'] };

const result = [];

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

function urlToImageName(path) {
    return path.replace(/[:\/?\. =#]/g, '-')+'.png';
}

async function takeScreenshot(config, server, path) {
    const browser = await puppeteer.launch(pconfig);
    const page = await browser.newPage();
    await page.goto(server.path);
    await config.login(page);
    await page.goto(server.path+path);
    const imageName = urlToImageName(server.path+path);
    await page.screenshot( { path: out+'/'+imageName, fullPage: false});
    await browser.close()

}

async function takeScreenshots(config) {

    reportStart();
    fs.mkdirsSync(out);

    await asyncForEach(config.urls, async entry => {
        const path = entry.path;
        await asyncForEach(config.servers, async entry => {
            await takeScreenshot(config, entry, path);
        });
        const ls = {
            path: path,
            reference: out+'/'+urlToImageName(config.servers[0].path + path),
            current: out+'/'+urlToImageName(config.servers[1].path + path),
            diff: out+'/'+urlToImageName('diff' + path),
            highlightColor: '#ff4040',
            strict: false, 
            tolerance: 2.5,
            antialiasingTolerance: 0,
            ignoreAntialiasing: true, 
            ignoreCaret: true 
        };
        await looksSame.createDiff(ls, function(error) {
            if(error) { console.log(error); }
        });
        result.push(ls);
    });
    result.forEach( cfg => {
        report(cfg.path, cfg.reference, cfg.current, cfg.diff);
    });
    reportEnd();
}

function reportStart() {
    console.log('<table>')
    console.log('<h2>compare',config.servers[0].path,'against', config.servers[0].path,'</h2>');
}

function report(path, left, right, diff) {
    console.log('<tr><td colspan=3><hr><h3>'+path);
    console.log('</h3></td></tr>');
    console.log('<tr>');
    console.log('<td><img src="'+left+'" style="width: 100%"></td>');
    console.log('<td><img src="'+right+'" style="width: 100%"></td>');
    console.log('<td><img src="'+diff+'" style="width: 100%"></td>');
    console.log('</tr>');
}

function reportEnd() {
    console.log('</table>')
}

takeScreenshots(config);
