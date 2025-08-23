import mongoose from "mongoose";

const url = process.env.MONGO_URL;

const connectToDb = async () => {
    try {
        await mongoose.connect(url);
        console.log('Connected to Database')
    } catch (error) {
        console.error('Error connecting to DB')
        console.error(error)
    }
}

export default connectToDb;