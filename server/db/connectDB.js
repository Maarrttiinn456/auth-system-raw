import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);

        console.log('Spojení s databází proběhlo úspěšně');
    } catch (error) {
        throw Error('Při spojení se databází se něco pokazilo:', error.message);
    }
};

export default connectDB;
