import { Expense } from '../models/expense.model.js';

export const ExpensesService = {
  async getAll(query) {
    const { category, amountFrom, amountTo, page = 1, take = 10 } = query;
    let filter = {};

    if (category) {
      const categoriesArray = category.split(',').map(c => c.trim().toLowerCase());
      filter.category = { $in: categoriesArray };
    }

    if (amountFrom || amountTo) {
      filter.amount = {};
      if (amountFrom) filter.amount.$gte = Number(amountFrom);
      if (amountTo) filter.amount.$lte = Number(amountTo);
    }

    const limit = Math.min(Number(take), 30);
    const skip = (Number(page) - 1) * limit;

    const data = await Expense.find(filter).skip(skip).limit(limit);
    const totalCount = await Expense.countDocuments(filter);

    return { totalCount, data };
  },

  // 5 ყველაზე ძვირი ხარჯი
  async getTopFive() {
    return await Expense.find().sort({ amount: -1 }).limit(5);
  },

  async getById(id) {
    return await Expense.findById(id);
  },

  async create(body) {
    const newExpense = new Expense(body);
    return await newExpense.save();
  },

  async update(id, body) {
    return await Expense.findByIdAndUpdate(id, body, { new: true });
  },

  async delete(id) {
    return await Expense.findByIdAndDelete(id);
  }
};