import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ExpenseService } from '../services/expense.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-view-expenses',
  templateUrl: 'view-expenses.page.html',
  styleUrls: ['view-expenses.page.scss']
})
export class ViewExpensesPage  {

  constructor(public expenseService: ExpenseService,
    public photoService: PhotoService,
    private router: Router) {
      this.expenseService.getExpense();
    }

  /**
   * Sets the expense in the service to the selected expense.
   * @param expense 
   */
  onSelect(expense) {
    this.expenseService.selectedExpense = expense;
    this.router.navigateByUrl('/detail-expense');
  }

  /**
   * Navigates to the new expense route
   */
  newExpense() {
    this.router.navigateByUrl('/new-expense');
  }
}
