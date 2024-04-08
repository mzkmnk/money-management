import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordExpensePage } from './record-expense.page';

const routes: Routes = [
  {
    path: '',
    component: RecordExpensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordExpensePageRoutingModule {}
