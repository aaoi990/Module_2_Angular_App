import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

import { Expense } from '../models/expense';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  public selectedExpense: Expense ;  
  public totalExpense = 0;
  public expenses = []
  constructor() { this.getExpense().then(() => this.calculateExpense()) }

  addExpense(expense): void {    
    this.expenses.push(expense);
    this.calculateExpense();
    this.setExpenses().then(() => 
      this.calculateExpense()
    ) 
  }

  async deleteExpense(expense) {
    var index = this.expenses.indexOf(expense)
    if (index !== -1) this.expenses.splice(index, 1);
    return this.setExpenses()
  }

  calculateExpense(): void {
    let count = 0;
    this.expenses.forEach(element => {
      count += +element.cost;
    });
    this.totalExpense = count;
  }

  async setExpenses() {
    await Storage.set({
      key: 'expense',
      value: JSON.stringify(this.expenses)
    });
  }

  async getExpense() {
    const ret = await Storage.get({ key: 'expense' });
    this.expenses = JSON.parse(ret.value);
  }

}