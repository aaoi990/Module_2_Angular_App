import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';

import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-view-expenses',
  templateUrl: 'view-expenses.page.html',
  styleUrls: ['view-expenses.page.scss']
})
export class ViewExpensesPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  constructor(public expenseService: ExpenseService,
    private router: Router) {
      this.expenseService.calculateExpense();
    }

  ngOnInit() {
  }

  onSelect(expense) {
    this.expenseService.selectedExpense = expense;
    this.router.navigateByUrl('/detail-expense');
  }

  newExpense() {
    this.router.navigateByUrl('/new-expense');
  }
}
