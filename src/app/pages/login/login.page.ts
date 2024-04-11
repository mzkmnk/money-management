import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ErrorService } from 'src/app/services/error/error.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private errorService: ErrorService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.isLogin();
  }

  ngOnInit() {}

  onSetEmail(event: any) {
    this.email = event.target.value;
  }
  onSetPassword(event: any) {
    this.password = event.target.value;
  }

  async isLogin() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent',
    });
    await loading.present();
    try {
      this.auth.authState.subscribe((user) => {
        if (user) {
          this.router.navigate(['/tabs']).then(() => {
            loading.dismiss();
          });
        } else {
          loading.dismiss();
        }
      });
    } catch (error) {
      this.errorService.logError(error);
      await loading.dismiss();
    }
  }

  async login() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent',
    });
    await loading.present();
    try {
      const user = await this.auth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      const toast = await this.toastController.create({
        message: 'お帰りなさい!',
        duration: 2000,
        color: 'success',
      });
      await toast.present();
      this.router.navigate(['/tabs']);
    } catch (error) {
      this.errorService.logError(error, 'ログインに失敗しました。');
    } finally {
      await loading.dismiss();
    }
  }

  isTappedButton() {
    if (this.email.length > 0 && this.password.length > 0) {
      return false;
    } else {
      return true;
    }
  }
}
