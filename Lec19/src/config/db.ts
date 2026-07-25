import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = 'mongodb://localhost:27017/product_crud';
    await mongoose.connect(mongoURI);
    console.log('MongoDB დაკავშირებულია!');
  } catch (error) {
    console.error('MongoDB-სთან კავშირი ვერ დამყარდა:', error);
    process.exit(1);
  }
};