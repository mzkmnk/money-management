import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddWalletsPage } from './add-wallets.page';

const routes: Routes = [
  {
    path: '',
    component: AddWalletsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddWalletsPageRoutingModule {}
