import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailCardPage } from './detail-card.page';


const routes: Routes = [
  {
    path: '',
    component: DetailCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailCardPageRoutingModule {}
