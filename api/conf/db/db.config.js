module.exports = {

    dev: {
        connectionString: 'mongodb://localhost/surfify',

        options: {
            server: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        }
    },

    prod: {
        connectionString: process.env.DB_CONNECTION,

        options: {
            server: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        }
    }

};