const {  Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: process.env.DB_PORT || 3306,
        logging: process.env.NODE_ENV === "development" ? console.log : false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        dialectOptions: {
            ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: true } : undefined,
        },
        define: {
            timestamps: true, 
            underscored: true,
            freezeTableName: true
        }
    }
);

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("MySQL Connection established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database: ", error);
        process.exit(1);
    }
}

module.exports = { sequelize, connectDB }