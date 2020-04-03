import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailExpensePageRoutingModule } from './detail-expense-routing.module';

import { DetailExpensePage } from './detail-expense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailExpensePageRoutingModule
  ],
  declarations: [DetailExpensePage]
})
export class DetailExpensePageModule {}
