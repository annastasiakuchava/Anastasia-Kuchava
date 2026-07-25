import { Injectable, NotFoundException } from '@nestjs/common';
import { Expense } from './expenses.interface';

@Injectable()
export class ExpensesService {
  private expenses: Expense[] = [];
  private idCounter = 1;

  getAllExpenses(): Expense[] {
    return this.expenses;
  }

  getExpenseById(id: number): Expense {
    const expense = this.expenses.find((e) => e.id === id);
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return expense;
  }

  createExpense(expenseData: Omit<Expense, 'id' | 'totalPrice'>): Expense {
    const totalPrice = expenseData.quantity * expenseData.price;
    const newExpense: Expense = {
      id: this.idCounter++,
      ...expenseData,
      totalPrice,
    };
    this.expenses.push(newExpense);
    return newExpense;
  }

  updateExpense(id: number, updateData: Partial<Omit<Expense, 'id' | 'totalPrice'>>): Expense {
    const index = this.expenses.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    const current = this.expenses[index];
    const quantity = updateData.quantity ?? current.quantity;
    const price = updateData.price ?? current.price;
    const totalPrice = quantity * price;

    this.expenses[index] = { ...current, ...updateData, quantity, price, totalPrice };
    return this.expenses[index];
  }

  deleteExpense(id: number) {
    const index = this.expenses.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    this.expenses.splice(index, 1);
    return { message: 'Expense deleted successfully' };
  }
}