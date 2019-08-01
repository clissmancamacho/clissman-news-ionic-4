import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NoticiasComponent } from "./noticias/noticias.component";
import { NoticiaComponent } from "./noticia/noticia.component";
import { IonicModule } from "@ionic/angular";
import { NoticeSkeletonComponent } from "./notice-skeleton/notice-skeleton.component";
import { HeaderComponent } from "./header/header.component";
import { SettingsModalPage } from "../pages/settings-modal/settings-modal.page";
import { FormsModule } from "@angular/forms";

@NgModule({
  entryComponents: [SettingsModalPage],
  declarations: [
    NoticiasComponent,
    NoticiaComponent,
    NoticeSkeletonComponent,
    HeaderComponent,
    SettingsModalPage
  ],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [NoticiasComponent, NoticeSkeletonComponent, HeaderComponent]
})
export class ComponentsModule {}
