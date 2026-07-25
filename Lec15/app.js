import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import expenseRouter from './routes/expenses.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/expenses', expenseRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ წარმატებით დაუკავშირდა MongoDB-ს!');
    app.listen(PORT, () => {
      console.log(`🚀 სერვერი მუშაობს პორტზე: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ ბაზასთან კავშირის შეცდომა:', err);
  });