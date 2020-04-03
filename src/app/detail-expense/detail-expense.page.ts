import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-detail-expense',
  templateUrl: './detail-expense.page.html',
  styleUrls: ['./detail-expense.page.scss'],
})
export class DetailExpensePage implements OnInit {
  
  expense = this.expenseService.selectedExpense;

  constructor( private expenseService: ExpenseService ) { }

  ngOnInit() {
    console.log(this.expense);
  }


}
