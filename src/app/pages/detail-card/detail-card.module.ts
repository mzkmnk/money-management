import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailCardPageRoutingModule } from './detail-card-routing.module';

import { DetailCardPage } from './detail-card.page';
import { AppCommonModule } from 'src/app/modules/app-common/app-common.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailCardPageRoutingModule,
    AppCommonModule,
  ],
  declarations: [DetailCardPage],
})
export class DetailCardPageModule {}
