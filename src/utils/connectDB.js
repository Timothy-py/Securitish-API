const { default: mongoose } = require("mongoose");
const logger = require("../../logger/logger");

const connectDB = async () => {
    var DATABASE_URI = '';
    if (process.env.NODE_ENV === 'TEST') {
        DATABASE_URI = "mongodb://127.0.0.1:27017/testdb"
    }else{
        DATABASE_URI = process.env.MONGODB_ATLAS_URI;
    } 

    await mongoose.connect(DATABASE_URI);

    const connection = mongoose.connection;
    logger.info('Connection to MongoDB Atlas established successfully')
}

module.exports = connectDB;