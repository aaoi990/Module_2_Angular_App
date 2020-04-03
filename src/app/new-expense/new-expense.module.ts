import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewExpensePageRoutingModule } from './new-expense-routing.module';

import { NewExpensePage } from './new-expense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewExpensePageRoutingModule
  ],
  declarations: [NewExpensePage]
})
export class NewExpensePageModule {}
