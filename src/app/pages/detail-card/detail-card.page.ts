import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.page.html',
  styleUrls: ['./detail-card.page.scss'],
})
export class DetailCardPage implements OnInit {
  walletId: string = '';
  walletName: string = '';
  money: string = '';
  usedMoney : number = 0; 
  walletDescription: string = '';
  records: any = [];
  data : any = [];
  constructor(private dataService: DataService) {
    this.walletId = this.dataService.getWalletId();
    this.walletName = this.dataService.getWalletName();
    this.money = this.dataService.getMoney();
    this.walletDescription = this.dataService.getWalletDescription();
    this.records = this.dataService.getRecords();
    let data: any = {};
    for (let record of this.records) {
      this.usedMoney += record.usedMoney;
      if (data[record.purpose]) {
        data[record.purpose] += record.usedMoney;
      } else {
        data[record.purpose] = record.usedMoney;
      }
    }
    this.data = Object.keys(data).map((key) => {
      return {
        name: key,
        value: data[key],
      };
    });
    //こんな感じでrecordsには以下のようなデータが入っている
    // [
    //   {
    //     usedMoney: 100,
    //     afterMoney: 7,
    //     purpose: '飲み物',
    //     date: { seconds: 1712994285, nanoseconds: 0 },
    //     type: 'document',
    //     beforeMoney: 107,
    //     backgroundStyle: '#eee2fc',
    //     iconStyle: '#D9A8EF',
    //   },
    // ];
  }

  ngOnInit() {}
  view: [number, number] = [350, 300];
  colorScheme: any = {
    domain: ['#FFC700', '#6D90F8', '#6AC4E4', '#D9A8EF', '#334055'],
  };

  // options
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  percentageFormatting = (value: number): string => {
    return `${value.toFixed(0)}%`; // 整数のパーセンテージ
  }
}
