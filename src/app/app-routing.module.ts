import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'new-expense',
    loadChildren: () => import('./new-expense/new-expense.module').then( m => m.NewExpensePageModule)
  },
  {
    path: 'detail-expense',
    loadChildren: () => import('./detail-expense/detail-expense.module').then( m => m.DetailExpensePageModule)
  },
  { 
    path: 'new-expense', 
    loadChildren: './new-expense/new-expense.module#NewExpensePageModule' 
  },
  { 
    path: 'detail-expense', 
    loadChildren: './detail-expense/detail-expense.module#DetailExpensePageModule' 
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
