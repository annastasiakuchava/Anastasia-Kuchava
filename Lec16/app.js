import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
import blogRouter from './routes/blogs.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use('/blogs', blogRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 3000, () => console.log(`server running`));
  })
  .catch(err => console.error('DB Error:', err));