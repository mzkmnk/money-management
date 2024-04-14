import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { DataService } from 'src/app/services/data/data.service';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-record-expense',
  templateUrl: './record-expense.page.html',
  styleUrls: ['./record-expense.page.scss'],
})
export class RecordExpensePage implements OnInit {
  wallets: any[] = [];
  selectedWallet: any = {};
  basedMoney: number = 0;
  purpose: string = '選択してください';
  isSelectedPurpose: boolean = false;
  memo: string = '';
  options: any = {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h24',
  };
  formatter = new Intl.DateTimeFormat('ja-JP', this.options);
  dateNotT: string = this.formatter.format(new Date()).replace(/\//g, '-');
  date: string = this.dateNotT.slice(0, 10) + 'T' + this.dateNotT.slice(11, 19);
  money: string = '0';
  constructor(
    private router: Router,
    private dataService: DataService,
    private errorService: ErrorService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.wallets = this.dataService.getWallets();
    if (this.wallets.length > 0) {
      this.selectedWallet = this.wallets[0];
      this.basedMoney = this.selectedWallet.money;
    }
  }

  ngOnInit() {}

  purposeChange(event: any) {
    this.purpose = event.detail.value;
  }

  dateChange(event: any) {
    this.date = event.detail.value;
  }

  selectedTapWallet(wallet: any) {
    this.selectedWallet = wallet;
    this.basedMoney = wallet.money;
    this.basedMoney -= Number(this.money);
    this.modalController.dismiss();
  }

  selectedUsedPurpose(purpose: string) {
    this.purpose = purpose;
    this.isSelectedPurpose = true;
    this.modalController.dismiss();
  }

  numberButtonClick(number: string) {
    if (number === 'backspace') {
      if (this.money === '0') {
        return;
      } else if (this.money.length === 1) {
        this.basedMoney += Number(this.money);
        this.money = '0';
      } else {
        this.basedMoney += Number(this.money);
        this.money = this.money.slice(0, -1);
        this.basedMoney -= Number(this.money);
      }
    } else {
      if (this.money === '0') {
        this.money = number;
        this.basedMoney -= Number(this.money);
      } else {
        this.basedMoney += Number(this.money);
        this.money += number;
        this.basedMoney -= Number(this.money);
      }
    }
  }

  isTapButtonDisabled() {
    if (this.money === '0' || this.isSelectedPurpose === false) {
      return true;
    } else {
      return false;
    }
  }

  async submit() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent',
    });
    const toast = await this.toastController.create({
      message: '登録しました',
      duration: 3000,
      color: 'success',
    });
    await loading.present();
    try {
      this.selectedWallet.money = this.basedMoney;
      await this.dataService.recordExpense(
        this.selectedWallet,
        this.money,
        this.date,
        this.purpose,
        'document'
      );
      await toast.present();
      this.router.navigate(['/home']).then(() => {
        this.money = '0';
        this.purpose = '';
        this.memo = '';
        this.purpose = '選択してください';
        this.selectedWallet = this.wallets[0];
        loading.dismiss();
      });
    } catch (error) {
      this.errorService.logError(error);
      await loading.dismiss();
    }
  }
}
