const mysql = require('mysql2');
const { log } = require('./../../libs/logger')

    const mysqlConnection = mysql.createPool({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'Welcome@123',
        database: 'express_crud',
        waitForConnections: true,
        connectionLimit: 1000,
        connectTimeout: 30000,
        queueLimit: 0
    });

    // For pool initialization, see above
    mysqlConnection.getConnection(function (err, conn) {
        // Do something with the connection
        if (err) {
            log.error('Mysql connection error')
            process.exit(-1);
            throw err;
        }
        log.info('MySQL connected');
        // Don't forget to release the connection when finished!
        mysqlConnection.releaseConnection(conn);
    });

module.exports = mysqlConnection;
