import { NgModule,CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailCardPageRoutingModule } from './detail-card-routing.module';

import { DetailCardPage } from './detail-card.page';
import { AppCommonModule } from 'src/app/modules/app-common/app-common.module';

import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailCardPageRoutingModule,
    AppCommonModule,
    NgxChartsModule,
  ],
  declarations: [DetailCardPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailCardPageModule {}
