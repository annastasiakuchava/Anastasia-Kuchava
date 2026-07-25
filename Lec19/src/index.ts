import express from 'express';
import { connectDB } from './config/db';
import productRoutes from './routes/product';

const app = express();
const PORT = 3000;

app.use(express.json());

// მონაცემთა ბაზასთან კავშირი
connectDB();

// პროდუქტების როუტების ინტეგრაცია
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`სერვერი წარმატებით გაეშვა პორტზე: http://localhost:${PORT}`);
});