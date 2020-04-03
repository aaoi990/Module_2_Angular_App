import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewExpensePage } from './new-expense.page';

const routes: Routes = [
  {
    path: '',
    component: NewExpensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewExpensePageRoutingModule {}
