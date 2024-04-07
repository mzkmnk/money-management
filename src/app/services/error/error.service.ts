import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(
    private firestore: AngularFirestore,
    private toastController: ToastController
  ) {}

  async logError(error: any, message: string = '') {
    const newDate = new Date();
    const timestamp = newDate.getTime();
    const docId = timestamp.toString();
    await this.firestore
      .collection('errors')
      .doc(docId)
      .set({ ...error, timestamp });
    if (message !== '') {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
    }
  }
}
