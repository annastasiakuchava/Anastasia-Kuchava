import express from 'express';
import expenseRouter from './routes/expenses.routes.js';
import factRouter from './routes/facts.routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/expenses', expenseRouter);
app.use('/', factRouter);

app.listen(PORT, () => {
  console.log(`სერვერი აწყობილია: http://localhost:${PORT}`);
});