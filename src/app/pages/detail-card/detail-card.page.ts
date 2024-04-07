import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.page.html',
  styleUrls: ['./detail-card.page.scss'],
})
export class DetailCardPage implements OnInit {
  walletId: string = '';
  walletName: string = '';
  money: string = '';
  walletDescription: string = '';
  constructor(private dataService: DataService) {
    this.walletId = this.dataService.getWalletId();
    this.walletName = this.dataService.getWalletName();
    this.money = this.dataService.getMoney();
    this.walletDescription = this.dataService.getWalletDescription();
  }
  
  ngOnInit() {
  }
}
