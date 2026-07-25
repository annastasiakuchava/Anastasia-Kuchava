import fs from 'fs/promises';

const FILE_PATH = './expenses.json';

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

export const ExpensesService = {
  async getAll(page, take) {
    const expenses = await readExpenses();
    if (take > 30) take = 30;
    const startIndex = (page - 1) * take;
    return {
      totalCount: expenses.length,
      data: expenses.slice(startIndex, startIndex + take)
    };
  },

  async getById(id) {
    const expenses = await readExpenses();
    return expenses.find(e => e.id === id);
  },

  async create({ title, amount }) {
    const expenses = await readExpenses();
    const newExpense = {
      id: expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1,
      title,
      amount
    };
    expenses.push(newExpense);
    await writeExpenses(expenses);
    return newExpense;
  },

  async update(id, { title, amount }) {
    const expenses = await readExpenses();
    const index = expenses.findIndex(e => e.id === id);
    if (index === -1) return null;

    expenses[index] = { id, title, amount };
    await writeExpenses(expenses);
    return expenses[index];
  },

  async delete(id) {
    const expenses = await readExpenses();
    const index = expenses.findIndex(e => e.id === id);
    if (index === -1) return null;

    const [deleted] = expenses.splice(index, 1);
    await writeExpenses(expenses);
    return deleted;
  }
};