require('dotenv').config();

const mongoConnection = process.env.MONGO_DB_CONNECTION ?? "";

export {
    mongoConnection
};