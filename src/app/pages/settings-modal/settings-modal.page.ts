import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { DataLocalService } from "../../services/data-local.service";

@Component({
  selector: "app-settings-modal",
  templateUrl: "./settings-modal.page.html",
  styleUrls: ["./settings-modal.page.scss"]
})
export class SettingsModalPage implements OnInit {
  countries = [
    {
      name: "Venezuela",
      code: "ve",
      isSelect: false
    },
    {
      name: "Estados Unidos",
      code: "us",
      isSelect: false
    }
  ];
  countryCodeSelected: any;
  constructor(
    private modalCtrl: ModalController,
    public dataLocalService: DataLocalService
  ) {}

  ngOnInit() {
    this.checkSelectedCountry();
    // console.log(this.countries);
  }

  checkSelectedCountry() {
    this.countries = this.countries.map(country => {
      if (country.code === this.dataLocalService.preferenceCountryCode) {
        country = { ...country, isSelect: true };
      }
      return country;
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  radioGroupChange(event) {
    this.countryCodeSelected = event.detail.value;
  }

  submitForm() {
    this.dataLocalService.savePreferenceCountry(this.countryCodeSelected);
    this.modalCtrl.dismiss();
  }
}
