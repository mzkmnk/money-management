import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _walletId = '';
  private _walletName = '';
  private _money = '';
  private _walletDescription = '';
  private _wallets: any[] = [];
  constructor(private firestore: AngularFirestore) {}

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
}
