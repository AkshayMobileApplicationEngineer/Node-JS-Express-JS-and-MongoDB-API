const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB is connected to: ${conn.connection.host}`.cyan);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`.red);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDb;
