import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _walletId = '';
  private _walletName = '';
  private _money = '';
  private _walletDescription = '';
  private _wallets: any[] = [];
  constructor(
    private firestore: AngularFirestore,
    private errorService: ErrorService
  ) {}

  setWalletId(walletId: string) {
    this._walletId = walletId;
  }
  getWalletId() {
    return this._walletId;
  }
  setWalletName(walletName: string) {
    this._walletName = walletName;
  }
  getWalletName() {
    return this._walletName;
  }
  setMoney(money: string) {
    this._money = money;
  }
  getMoney() {
    return this._money;
  }
  setWalletDescription(walletDescription: string) {
    this._walletDescription = walletDescription;
  }
  getWalletDescription() {
    return this._walletDescription;
  }
  setWallets(wallets: any[]) {
    this._wallets = wallets;
  }
  getWallets() {
    return this._wallets;
  }

  //使ったお金を記録する
  async recordExpense(
    wallet: any,
    money: string,
    date: string,
    purpose: string,
    type:string,
  ) {
    const timestampDate = new Date(date);
    const data = {
      beforeMoney: Number(wallet.money) + Number(money),
      afterMoney: Number(wallet.money),
      date: timestampDate,
      usedMoney: Number(money),
      purpose: purpose,
      type,
    };
    try {
      const walletRef = this.firestore
        .collection('wallets')
        .doc(wallet.walletId);
      const walletSnapShot = await walletRef.get().toPromise();
      if (walletSnapShot && walletSnapShot.exists) {
        const walletData: any = walletSnapShot.data();
        if (walletData) {
          let records = walletData.records || [];
          records.push(data);
          await walletRef.update({
            records: records,
            money: wallet.money,
          });
        } else {
          this.errorService.logError('Wallet data not found');
        }
      } else {
        this.errorService.logError('Wallet not found');
      }
    } catch (error) {
      this.errorService.logError(error);
    }
  }
}
