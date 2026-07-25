import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from './expenses.interface';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  getAllExpenses() {
    return this.expensesService.getAllExpenses();
  }

  @Get(':id')
  getExpenseById(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.getExpenseById(id);
  }

  @Post()
  createExpense(@Body() expenseData: Omit<Expense, 'id' | 'totalPrice'>) {
    return this.expensesService.createExpense(expenseData);
  }

  @Put(':id')
  updateExpense(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<Omit<Expense, 'id' | 'totalPrice'>>,
  ) {
    return this.expensesService.updateExpense(id, updateData);
  }

  @Delete(':id')
  deleteExpense(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.deleteExpense(id);
  }
}