#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs/promises';

const program = new Command();
const FILE_PATH = './expenses.json';

// ფაილის წაკითხვა
async function readExpenses() {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// ფაილში ჩაწერა
async function writeExpenses(expenses) {
  await fs.writeFile(FILE_PATH, JSON.stringify(expenses, null, 2));
}

program
  .name('expense-cli')
  .description('CLI Expense Tracker Manager');

// 1. ADD (შექმნა ვალიდაციით)
program
  .command('add')
  .description('Add a new expense')
  .requiredOption('-c, --category <category>', 'Expense category')
  .requiredOption('-p, --price <price>', 'Expense price', parseFloat)
  .action(async (options) => {
    if (options.price < 10) {
      console.error('❌ შეცდომა: ხარჯის თანხა არ უნდა იყოს 10-ზე ნაკლები!');
      return;
    }

    const expenses = await readExpenses();
    const newExpense = {
      id: expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1,
      category: options.category.toLowerCase(),
      price: options.price,
      createdAt: new Date().toISOString()
    };

    expenses.push(newExpense);
    await writeExpenses(expenses);
    console.log('✅ ხარჯი წარმატებით დაემატა:', newExpense);
  });

// 2. SHOW (წაკითხვა + სორტირება + ფილტრი + ფეჯინეიშენი)
program
  .command('show')
  .description('Show expenses with sorting, filtering and pagination')
  .option('--asc', 'Sort by date ascending')
  .option('--desc', 'Sort by date descending')
  .option('-c, --category <category>', 'Filter by category')
  .option('--page <page>', 'Page number', parseInt, 1)
  .option('--limit <limit>', 'Items per page', parseInt, 5)
  .action(async (options) => {
    let expenses = await readExpenses();

    if (options.category) {
      expenses = expenses.filter(e => e.category === options.category.toLowerCase());
    }

    if (options.asc) {
      expenses.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (options.desc) {
      expenses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    const totalItems = expenses.length;
    const startIndex = (options.page - 1) * options.limit;
    const endIndex = startIndex + options.limit;
    const paginatedExpenses = expenses.slice(startIndex, endIndex);

    console.log(`--- ხარჯების სია (გვერდი ${options.page}, ლიმიტი ${options.limit}) ---`);
    console.log(paginatedExpenses);
    console.log(`სულ მოიძებნა: ${totalItems} ჩანაწერი.`);
  });

// 3. GET BY ID (წაკითხვა ID-ით)
program
  .command('get <id>')
  .description('Get expense by ID')
  .action(async (id) => {
    const expenses = await readExpenses();
    const expense = expenses.find(e => e.id === parseInt(id));

    if (!expense) {
      console.log(`❌ ხარჯი ID-ით ${id} ვერ მოიძებნა.`);
      return;
    }
    console.log('🔍 ნაპოვნი ხარჯი:', expense);
  });

// 4. UPDATE (განახლება)
program
  .command('update <id>')
  .description('Update an existing expense')
  .option('-c, --category <category>', 'New category')
  .option('-p, --price <price>', 'New price', parseFloat)
  .action(async (id, options) => {
    const expenses = await readExpenses();
    const expense = expenses.find(e => e.id === parseInt(id));

    if (!expense) {
      console.log(`❌ ხარჯი ID-ით ${id} ვერ მოიძებნა.`);
      return;
    }

    if (options.price !== undefined) {
      if (options.price < 10) {
        console.error('❌ შეცდომა: განახლებული თანხა არ უნდა იყოს 10-ზე ნაკლები!');
        return;
      }
      expense.price = options.price;
    }

    if (options.category) {
      expense.category = options.category.toLowerCase();
    }

    await writeExpenses(expenses);
    console.log('🔄 ხარჯი განახლდა:', expense);
  });

// 5. DELETE (წაშლა)
program
  .command('delete <id>')
  .description('Delete an expense by ID')
  .action(async (id) => {
    const expenses = await readExpenses();
    const idInt = parseInt(id);
    const expenseToDelete = expenses.find(e => e.id === idInt);

    if (!expenseToDelete) {
      console.log(`❌ ხარჯი ID-ით ${id} ვერ მოიძებნა.`);
      return;
    }

    const filtered = expenses.filter(e => e.id !== idInt);
    await writeExpenses(filtered);
    console.log('🗑️ წაშლილი ხარჯი:', expenseToDelete);
  });

// 6. SEARCH BY DATE (ძებნა თარიღით)
program
  .command('search <date>')
  .description('Search expenses by specific date (YYYY-MM-DD)')
  .action(async (dateString) => {
    const expenses = await readExpenses();
    const results = expenses.filter(e => e.createdAt.startsWith(dateString));

    console.log(`🔎 ძებნის შედეგები თარიღისთვის [${dateString}]:`);
    console.log(results);
  });

program.parse(process.argv);