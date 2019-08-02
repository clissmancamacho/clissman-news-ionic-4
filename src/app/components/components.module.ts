import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NoticiasComponent } from "./noticias/noticias.component";
import { NoticiaComponent } from "./noticia/noticia.component";
import { IonicModule } from "@ionic/angular";
import { NoticeSkeletonComponent } from "./notice-skeleton/notice-skeleton.component";
import { HeaderComponent } from "./header/header.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    NoticiasComponent,
    NoticiaComponent,
    NoticeSkeletonComponent,
    HeaderComponent
  ],
  imports: [CommonModule, IonicModule, FormsModule, SharedModule],
  exports: [NoticiasComponent, NoticeSkeletonComponent, HeaderComponent]
})
export class ComponentsModule {}
