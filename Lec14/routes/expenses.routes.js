import { Router } from 'express';
import { ExpensesService } from '../services/expenses.service.js';
import { checkSecretKey } from '../middlewares/auth.middleware.js';
import { validateExpenseCreate } from '../middlewares/validation.middleware.js';

const router = Router();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const take = parseInt(req.query.take) || 10;
  if (page < 1 || take < 1) return res.status(400).json({ error: "page და take უნდა იყოს 1-ზე მეტი!" });

  const result = await ExpensesService.getAll(page, take);
  res.json({ page, take, ...result });
});

router.get('/:id', async (req, res) => {
  const expense = await ExpensesService.getById(parseInt(req.params.id));
  if (!expense) return res.status(404).json({ error: "ხარჯი ვერ მოიძებნა!" });
  res.json(expense);
});

router.post('/', validateExpenseCreate, async (req, res) => {
  const newExpense = await ExpensesService.create(req.body);
  res.status(201).json(newExpense);
});

router.put('/:id', async (req, res) => {
  const updated = await ExpensesService.update(parseInt(req.params.id), req.body);
  if (!updated) return res.status(404).json({ error: "ხარჯი ვერ მოიძებნა!" });
  res.json(updated);
});

router.delete('/:id', checkSecretKey, async (req, res) => {
  const deleted = await ExpensesService.delete(parseInt(req.params.id));
  if (!deleted) return res.status(404).json({ error: "ხარჯი ვერ მოიძებნა!" });
  res.json({ message: "წარმატებით წაიშალა", expense: deleted });
});

export default router;