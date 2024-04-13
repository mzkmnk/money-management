import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordExpensePageRoutingModule } from './record-expense-routing.module';

import { RecordExpensePage } from './record-expense.page';
import { AppCommonModule } from 'src/app/modules/app-common/app-common.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordExpensePageRoutingModule,
    AppCommonModule,
  ],
  declarations: [RecordExpensePage]
})
export class RecordExpensePageModule {}
