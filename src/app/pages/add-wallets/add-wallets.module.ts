import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddWalletsPageRoutingModule } from './add-wallets-routing.module';

import { AddWalletsPage } from './add-wallets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddWalletsPageRoutingModule
  ],
  declarations: [AddWalletsPage]
})
export class AddWalletsPageModule {}
