const config = {
    servers: [
        { name: 'aem64', path: 'http://localhost:6300', user: 'admin', 'password': 'admin' },
        { name: 'aem65', path: 'http://localhost:6500', user: 'admin', 'password': 'admin' }
    ],
    login: async function(page) {
        await page.type('#username', 'admin');
        await page.type('#password', 'admin');
        await page.click('#submit-button');
        await page.waitForNavigation();
        },
    urls: [
        { path: '/aem/start.html' },
        { path: '/miscadmin#/etc/acs-commons/lists' },
        { path: '/etc/acs-commons/reports.html' },
        { path: '/var/acs-commons/reports/sample-components-report.html?wcmmode=disabled' },
        { path: '/etc/acs-commons/audit-log-search.html' },
        { path: '/miscadmin#/etc/acs-commons/automatic-package-replication' },
        { path: '/miscadmin#/etc/acs-commons/dispatcher-flush' },
        { path: '/miscadmin#/etc/acs-commons/redirect-maps' },
        { path: '/etc/acs-commons/version-replicator.html' },
        { path: '/etc/acs-commons/version-compare.html' },
        { path: '/etc/acs-commons/page-compare.html' },
        { path: '/etc/acs-commons/jcr-compare.html' },
        { path: '/etc/acs-commons/manage-controlled-processes.html' },
        { path: '/miscadmin#/etc/acs-commons/bulk-workflow-manager' },
        { path: '/etc/acs-commons/workflow-remover.html' },
        { path: '/miscadmin#/etc/acs-commons/notifications' },
        { path: '/miscadmin#/etc/acs-commons/exporters' },
        { path: '/etc/acs-commons/qr-code.html' },
        { path: '/etc/acs-commons/oak-index-manager.html' }
    ]
}

exports.config = config;