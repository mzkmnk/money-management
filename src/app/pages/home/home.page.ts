import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  wallets: any = [];
  userIconURL: string = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  username: string = 'User';
  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private errorService: ErrorService,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
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
              this.wallets.push({
                walletId: walletId,
                walletName: walletData['walletName'],
                walletDescription: walletData['walletDescription'],
                money: walletData['money'],
              });
            }
          }
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
}
