import mongoose from 'mongoose';

export default async function connectDatabase() {
	try {
		mongoose.set('strictQuery', true);
		await mongoose.connect(process.env.MONGODB_URI || '');
		console.log('Database connected');
	} catch (error) {
		console.log('Database connection failed');
		process.exit(1);
	}
}
