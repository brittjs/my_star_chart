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
    session: {
        secretKey: 'myKoajsSecretKey'
    }
};