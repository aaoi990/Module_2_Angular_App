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
  public expenses: Expense[] = [];

  constructor() { }

  /**
   * Adds expense to local array. Updates the local storage,
   * calculates new total.
   * @param expense 
   */
  addExpense(expense): void { 
    this.expenses.push(expense);
    this.calculateExpense();
    this.setExpenses();
  }

  /**
   * Deletes expense. Removes from array and pushes array
   * to local storage.
   * @param expense 
   * @returns Promise
   */
  async deleteExpense(expense) {
    var index = this.expenses.indexOf(expense)
    if (index !== -1) this.expenses.splice(index, 1);
    return this.setExpenses()
  }
 
  /**
   * Calculates expense. Addition of all expenses 
   * in expense array.
   */
  calculateExpense(): void {
    let count = 0;
    this.expenses.forEach(element => {
      count += +element.cost;
    });
    this.totalExpense = count;
  }

  /**
   * Sets expenses to local storage with key 'expenses'.
   * Stringifies the array first as per the ionic storage api.
   * @returns Promise  
   */
  async setExpenses() {
    await Storage.set({
      key: 'expense',
      value: JSON.stringify(this.expenses)
    }).then(() => this.calculateExpense())
  }

  /**
   * Gets expenses from local storage.
   * @returns Promise
   */
  async getExpense() {
    const ret = await Storage.get({ key: 'expense' });   
    this.expenses = JSON.parse(ret.value) || [];
    this.calculateExpense();
  }

}