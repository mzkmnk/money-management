import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ErrorService } from 'src/app/services/error/error.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  wallets: any = [];
  type = 'home';
  userIconURL: string = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  username: string = 'User';
  totalMoney: number = 0;
  usedMoney: number = 0;
  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private errorService: ErrorService,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private dataService: DataService
  ) {
    this.getWallets();
  }

  async getWallets() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'lines-sharp-small',
    });
    await loading.present();
    try {
      const userCredential = await this.auth.currentUser;
      if (userCredential) {
        const uid = userCredential.uid;

        const userDoc = await this.firestore
          .collection('users')
          .doc(uid)
          .get()
          .toPromise();
        if (userDoc) {
          const userData: any = userDoc.data();
          this.userIconURL = userData['userIconURL'];
          this.username = userData['username'];
          const userWalletsData = userData['wallets'] || [];
          for (const walletId of userWalletsData) {
            const walletDoc = await this.firestore
              .collection('wallets')
              .doc(walletId)
              .get()
              .toPromise();
            if (walletDoc) {
              const walletData: any = walletDoc.data();
              let walletImgPath = '';
              if (walletData['walletType'] === 'wallet') {
                walletImgPath = '../../../assets/img/wallet.png';
              } else if (walletData['walletType'] === 'bank') {
                walletImgPath = '../../../assets/img/bank.png';
              }
              this.wallets.push({
                walletId: walletId,
                walletName: walletData['walletName'],
                walletDescription: walletData['walletDescription'],
                money: walletData['money'],
                walletType: walletData['walletType'],
                walletImgPath: walletImgPath,
              });
              this.totalMoney += Number(walletData['money']);
            }
          }
          this.dataService.setWallets(this.wallets);
        }
      }
    } catch (error) {
      this.errorService.logError(error, '情報が取得できませんでした。');
    } finally {
      loading.dismiss();
    }
  }

  addWallet() {
    this.router.navigate(['/add-wallets']);
  }

  detailCard(wallet: any) {
    this.dataService.setWalletId(wallet.walletId);
    this.dataService.setWalletName(wallet.walletName);
    this.dataService.setMoney(wallet.money);
    this.dataService.setWalletDescription(wallet.walletDescription);
    this.router.navigate(['/detail-card']);
  }

  clickToRecordExpense() {
    this.router.navigate(['/record-expense']);
  }
}
