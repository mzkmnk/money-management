import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ErrorService } from 'src/app/services/error/error.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-wallets',
  templateUrl: './add-wallets.page.html',
  styleUrls: ['./add-wallets.page.scss'],
})
export class AddWalletsPage implements OnInit {
  walletName = '';
  money = 0;
  walletDescription = '';
  constructor(
    private errorService: ErrorService,
    private location: Location,
    private router: Router,
    private navController: NavController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  ngOnInit() {}

  setWalletName(event: any) {
    this.walletName = event.target.value;
  }
  setMoney(event: any) {
    this.money = event.target.value;
  }
  setWalletDescription(event: any) {
    this.walletDescription = event.target.value;
  }

  isNextOk() {
    if (this.walletName.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  back() {
    this.navController.setDirection('back');
    this.location.back();
  }
  async addWallet() {
    const loading = await this.loadingController.create({
      message: 'add Wallet',
      spinner: 'bubbles',
    });
    try {
      await loading.present();
      const userCredential = await this.auth.currentUser;
      if (userCredential) {
        const uid = userCredential.uid;
        const walletData = await this.firestore.collection('wallets').add({
          walletName: this.walletName,
          money: this.money,
          walletDescription: this.walletDescription,
          uid,
        });
        const walletId = walletData.id;
        const userDoc = await this.firestore
          .collection('users')
          .doc(uid)
          .get()
          .toPromise();
        if (userDoc) {
          const userData: any = userDoc.data();
          const wallets = userData['wallets'] || [];
          wallets.push(walletId);
          await this.firestore.collection('users').doc(uid).update({
            wallets,
          });
        }
        const toast = await this.toastController.create({
          message: 'Walletを追加しました。',
          duration: 4000,
          color: 'success',
        });
        await toast.present();
        this.router.navigate(['/home']);
      }
    } catch (error) {
      this.errorService.logError(error, 'エラーが発生しました。');
    } finally {
      await loading.dismiss();
    }
  }
}
