import express from 'express';
import fs from 'fs/promises';

const app = express();
const PORT = 3000;
const FILE_PATH = './expenses.json';

// ბოდის პარსერი JSON-ისთვის
app.use(express.json());

// დამხმარე ფუნქციები ფაილის წასაკითხად და ჩასაწერად
async function readExpenses() {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeExpenses(expenses) {
  await fs.writeFile(FILE_PATH, JSON.stringify(expenses, null, 2));
}

// ----------------------------------------------------
// 3) ვალიდაციის Middleware წაშლის დროს (Secret Key)
// ----------------------------------------------------
const checkSecretKey = (req, res, next) => {
  const secret = req.headers['secret'];
  
  if (secret === 'random123') {
    next(); // თუ კოდი სწორია, აგრძელებს გზას ენდპოინტისკენ
  } else {
    return res.status(403).json({ error: "Forbidden: არასწორი ან არარსებული საიდუმლო კოდი ჰედერში!" });
  }
};

// ----------------------------------------------------
// 1) & 2) GET /expenses (CRUD-ის წაკითხვა + Pagination)
// ----------------------------------------------------
app.get('/expenses', async (req, res) => {
  const expenses = await readExpenses();

  // ფეჯინეიშენის პარამეტრები Query-დან (Default მნიშვნელობებით)
  let page = parseInt(req.query.page) || 1;
  let take = parseInt(req.query.take) || 10;

  // ვალიდაცია: გვერდი ან take არ უნდა იყოს ნულზე ნაკლები
  if (page < 1 || take < 1) {
    return res.status(400).json({ error: "page და take უნდა იყოს 1-ზე მეტი!" });
  }

  // ზედა ზღვარის შეზღუდვა (მაგალითად მაქსიმუმ 30 ჩანაწერი)
  if (take > 30) {
    take = 30; 
  }

  // ფეჯინეიშენის ლოგიკა (Slice)
  const startIndex = (page - 1) * take;
  const endIndex = page * take;
  const paginatedExpenses = expenses.slice(startIndex, endIndex);

  res.json({
    page,
    take,
    totalCount: expenses.length,
    data: paginatedExpenses
  });
});

// GET Single Expense (ID-ით წაკითხვა)
app.get('/expenses/:id', async (req, res) => {
  const expenses = await readExpenses();
  const id = parseInt(req.params.id);
  const expense = expenses.find(e => e.id === id);

  if (!expense) {
    return res.status(404).json({ error: "ხარჯი ამ ID-ით ვერ მოიძებნა!" });
  }

  res.json(expense);
});

// POST /expenses (შექმნა + ვალიდაცია)
app.post('/expenses', async (req, res) => {
  const { title, amount } = req.body;

  // 4) ერორების ჰენდლინგი (არასწორი ინფო)
  if (!title || typeof title !== 'string' || !amount || typeof amount !== 'number') {
    return res.status(400).json({ error: "არასწორი მონაცემები! 'title' (string) და 'amount' (number) სავალდებულოა." });
  }

  const expenses = await readExpenses();
  const newExpense = {
    id: expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1,
    title,
    amount
  };

  expenses.push(newExpense);
  await writeExpenses(expenses);

  res.status(201).json(newExpense);
});

// PUT /expenses/:id (განახლება + ვალიდაცია)
app.put('/expenses/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, amount } = req.body;

  if (!title || typeof title !== 'string' || !amount || typeof amount !== 'number') {
    return res.status(400).json({ error: "არასწორი მონაცემები განახლებისთვის!" });
  }

  const expenses = await readExpenses();
  const index = expenses.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "ხარჯი ამ ID-ით ვერ მოიძებნა!" });
  }

  expenses[index] = { id, title, amount };
  await writeExpenses(expenses);

  res.json(expenses[index]);
});

// ----------------------------------------------------
// 3) DELETE /expenses/:id (წაშლა + საიდუმლო ჰედერის შემოწმება)
// ----------------------------------------------------
app.delete('/expenses/:id', checkSecretKey, async (req, res) => {
  const id = parseInt(req.params.id);
  const expenses = await readExpenses();
  const index = expenses.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "ხარჯი ამ ID-ით ვერ მოიძებნა!" });
  }

  const deletedExpense = expenses.splice(index, 1);
  await writeExpenses(expenses);

  res.json({ message: "წარმატებით წაიშალა", expense: deletedExpense[0] });
});

// სერვერის გაშვება
app.listen(PORT, () => {
  console.log(`ხარჯების სერვერი ჩაირთო: http://localhost:${PORT}`);
});