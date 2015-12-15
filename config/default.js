module.exports = {
    app: {
        name: 'StarChart',
        version: '0.0.1'
    },
    server: {
        port: 3000
    },
    template: {
        path: './app/views',
        options: {
            map: { ect: 'ect' }
        }
    },
    publicfiles: {
        path: './app/public',
        options: {}
    },
    database: {
        path: 'postgres://okay:P@ssw0rd@localhost:5432/star-chart', //put your own username and password here
        options: {}
    },
    session: {
        secretKey: 'myKoajsSecretKey'
    }
};