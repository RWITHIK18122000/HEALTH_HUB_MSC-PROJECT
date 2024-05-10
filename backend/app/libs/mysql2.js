const mysql = require("mysql2/promise");

const configs = require("../configs");

const pool = mysql.createPool({
	host: configs.DB_HOST,
	user: configs.DB_USER,
	database: configs.DB_DATABASE,
	waitForConnections: true,
	connectionLimit: 10,
	maxIdle: 10,
	idleTimeout: 60000,
	queueLimit: 0,
	enableKeepAlive: true,
	keepAliveInitialDelay: 0,
});

module.exports = pool;
