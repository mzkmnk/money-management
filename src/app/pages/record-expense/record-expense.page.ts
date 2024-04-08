import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-record-expense',
  templateUrl: './record-expense.page.html',
  styleUrls: ['./record-expense.page.scss'],
})
export class RecordExpensePage implements OnInit {
  wallets: any[] = [];
  constructor(private dataService: DataService) {
    this.wallets = this.dataService.getWallets();
  }

  ngOnInit() {}

  
}
