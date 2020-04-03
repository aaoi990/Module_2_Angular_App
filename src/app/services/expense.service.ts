import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  public selectedExpense: Expense ;  
  public totalExpense = 0;
  public expenses = [
      {id: 1, type: 'meal', description: 'Dinner with a client', cost: 10 },
      {id: 2, type: 'meal', description: 'Lunch at airport', cost: 10 },   
      {id: 3, type: 'lodging', description: 'Hotel at convention', cost: 100 }]
  constructor() { }

  addExpense(expense): void {
    this.expenses.push(expense);
    this.calculateExpense();
  }

  calculateExpense(): void {
    let count = 0;
    this.expenses.forEach(element => {
      count += +element.cost;
    });
    this.totalExpense = count;
  }
}