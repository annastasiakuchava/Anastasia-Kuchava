import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetExpensesQueryDto } from './dto/get-expenses-query.dto';

@Injectable()
export class ExpensesService {
  private expenses = [];

  create(createExpenseDto: CreateExpenseDto) {
    const newExpense = { id: Date.now(), ...createExpenseDto };
    this.expenses.push(newExpense);
    return newExpense;
  }

  findAll(query: GetExpensesQueryDto) {
    const { page = 1, take = 30, category, priceFrom, priceTo } = query;

    let filtered = this.expenses;

    if (category) {
      filtered = filtered.filter((e) => e.category === category);
    }

    if (priceFrom !== undefined) {
      filtered = filtered.filter((e) => e.price >= priceFrom);
    }

    if (priceTo !== undefined) {
      filtered = filtered.filter((e) => e.price <= priceTo);
    }

    const start = (page - 1) * take;
    const end = start + take;

    return {
      data: filtered.slice(start, end),
      total: filtered.length,
      page,
      take,
    };
  }
}