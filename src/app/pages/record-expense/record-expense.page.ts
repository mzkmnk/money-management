import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';


@Component({
  selector: 'app-record-expense',
  templateUrl: './record-expense.page.html',
  styleUrls: ['./record-expense.page.scss'],
})
export class RecordExpensePage implements OnInit {
  wallets: any[] = [];
  money: string = '0';
  constructor(private dataService: DataService) {
    this.wallets = this.dataService.getWallets();
  }

  ngOnInit() {}

  numberButtonClick(number: string) {
    if (number === 'backspace') {
      if (this.money === '0') {
        return;
      } else if (this.money.length === 1) {
        this.money = '0';
      } else {
        this.money = this.money.slice(0, -1);
      }
    } else {
      if (this.money === '0') {
        this.money = number;
      } else {
        this.money += number;
      }
    }
  }
}
