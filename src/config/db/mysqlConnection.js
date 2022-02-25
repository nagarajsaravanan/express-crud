const mysql = require('mysql2');
    const mysqlConnection = mysql.createPool({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'Welcome@123',
        database: 'express_crud',
        waitForConnections: true,
        connectionLimit: 1000,
        connector: "mysql",
        connectTimeout: 30000,
        queueLimit: 0
    });

    // For pool initialization, see above
    mysqlConnection.getConnection(function (err, conn) {
        // Do something with the connection
        if (err) {
            console.log('Mysql connection error');
            process.exit(-1);
            throw err;
        }
        console.log('MySQL connected');
        // Don't forget to release the connection when finished!
        mysqlConnection.releaseConnection(conn);
    });

module.exports = mysqlConnection;
