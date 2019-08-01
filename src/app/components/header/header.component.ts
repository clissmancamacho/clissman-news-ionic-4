import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { SettingsModalPage } from "../../pages/settings-modal/settings-modal.page";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Input() color: string;
  @Input() title: string;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async openModalSettings() {
    const modal = await this.modalCtrl.create({
      component: SettingsModalPage
    });

    await modal.present();
  }
}
