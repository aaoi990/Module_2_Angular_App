import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ExpenseService } from '../services/expense.service';

import { Expense } from '../models/expense';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.page.html',
  styleUrls: ['./new-expense.page.scss'],
})
export class NewExpensePage implements OnInit {
  newExpense: Expense = { id: this.expenseService.expenses.length + 1, type: '', description: '', cost: 0 };

  constructor( private expenseService: ExpenseService,
               private router: Router ) { }

  ngOnInit() {
  }

  addExpense() {
    this.expenseService.addExpense(this.newExpense)
    this.router.navigateByUrl('/tabs/viewExpenses');   
  }

  inputCheck() {
    return (this.newExpense.description == '');
  }

}