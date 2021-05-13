import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public alertController: AlertController
  ) { }
  async presentConfirm(header: any,message: any,cancelText: any,okText: any): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: header,
        message: message,
        cssClass: 'my-custom-alert-css',
        buttons: [
          {
            text: cancelText,
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {
              resolve('cancel');
            }
          }, {
            text: okText,
            handler: (ok) => {
              resolve('ok');
            }
          }
        ]
      });
      alert.present();
    });
  }

  async presentAlert(header: any,message: any,okText: any): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: header,
        message: message,
        cssClass: 'my-custom-alert-css',
        buttons: [
           {
            text: okText,
            handler: (ok) => {
              resolve('ok');
            }
          }
        ]
      });
      alert.present();
    });
  }

  hideAlert() {
    this.alertController.dismiss().then((res) => {
      //console.log('Loading dismissed!', res);
    }).catch((error) => {
      //console.log('error', error);
    });

  }
}
