import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordExpensePageRoutingModule } from './record-expense-routing.module';

import { RecordExpensePage } from './record-expense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordExpensePageRoutingModule
  ],
  declarations: [RecordExpensePage]
})
export class RecordExpensePageModule {}
