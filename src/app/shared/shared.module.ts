import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsModalPage } from "../pages/settings-modal/settings-modal.page";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [SettingsModalPage],
  entryComponents: [SettingsModalPage],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [SettingsModalPage]
})
export class SharedModule {}
