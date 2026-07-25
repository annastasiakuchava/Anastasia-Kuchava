import { Router } from 'express';
import { ExpensesService } from '../services/expenses.service.js';
import { validateObjectId } from '../middlewares/validateId.middleware.js';

const router = Router();

router.get('/top-5', async (req, res) => {
  try {
    const topExpenses = await ExpensesService.getTopFive();
    res.json(topExpenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await ExpensesService.getAll(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', validateObjectId, async (req, res) => {
  try {
    const expense = await ExpensesService.getById(req.params.id);
    if (!expense) return res.status(404).json({ error: "ხარჯი ვერ მოიძებნა!" });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newExpense = await ExpensesService.create(req.body);
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', validateObjectId, async (req, res) => {
  try {
    const updated = await ExpensesService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "ხარჯი ვერ მოიძებნა!" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', validateObjectId, async (req, res) => {
  try {
    const deleted = await ExpensesService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "ხარჯი ვერ მოიძებნა!" });
    res.json({ message: "წარმატებით წაიშალა", expense: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;