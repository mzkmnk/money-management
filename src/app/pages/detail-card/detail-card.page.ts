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
  walletDescription: string = '';
  records: any = [];
  constructor(private dataService: DataService) {
    this.walletId = this.dataService.getWalletId();
    this.walletName = this.dataService.getWalletName();
    this.money = this.dataService.getMoney();
    this.walletDescription = this.dataService.getWalletDescription();
    this.records = this.dataService.getRecords();
    let data: any = {};
    for (let record of this.records) {
      const date: string = record.date.toDate().toISOString();
      const dateKey: string = date.split('T')[0];
      if (data[dateKey]) {
        data[dateKey] += record.usedMoney;
      } else {
        data[dateKey] = record.usedMoney;
      }
    }
    let dataNor = [];
    for (let key in data) {
      dataNor.push({ name: key, value: data[key] });
    }
    this.records = [
      {
        name: 'records',
        series: dataNor,
      },
    ];
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

  view: [number, number] = [350, 350];
  colorScheme: any = {
    domain: ['#858FFF'],
  };

  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = false;
  showYAxisLabel = false;
  gradient = true;
  timeline = false;
  showLegend = false;
  curve = d3.curveNatural;
}
