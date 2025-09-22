const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("my2fa_db", "root", "", {
	host: "localhost",
	dialect: "mysql"
});

async function testDBConnection() {
	try {
		await sequelize.authenticate();
		console.log('Database connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

testDBConnection();

module.exports = sequelize;