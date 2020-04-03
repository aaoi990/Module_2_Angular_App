import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'viewExpenses',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../view-expenses/view-expenses.module').then(m => m.ViewExpensesPageModule)
          }
        ]
      },
      {
        path: 'gallery',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../gallery/gallery.module').then(m => m.GalleryModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/viewExpenses',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/viewExpenses',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
