import { Component, OnInit } from "@angular/core";

import { Platform, AlertController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SwUpdate } from "@angular/service-worker";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private swUpdate: SwUpdate,
    private alertCtrl: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Light Status
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(async () => {
        const alert = await this.alertCtrl.create({
          header: `¡Actualiza la App!`,
          message: `Hay una nueva version de la APP, simplemente toca recargar`,
          buttons: [
            {
              text: "Cancelar",
              role: "cancel",
              cssClass: "secondary"
            },
            {
              text: "Recargar",
              handler: () => {
                window.location.reload();
              }
            }
          ]
        });

        await alert.present();
      });
    }
  }
}
