import mongoose from 'mongoose';

const dataBaseConnection = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        const data = await mongoose.connect(
            process.env.MONGO_CONNECTION_STRING,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log(
            `MongoDB is connected with server: ${data.connection.host}`
        );
    } catch (error) {
        console.error('Database connection failed:', error);
    }
};

export default dataBaseConnection;
