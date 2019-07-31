import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NoticiasComponent } from "./noticias/noticias.component";
import { NoticiaComponent } from "./noticia/noticia.component";
import { IonicModule } from "@ionic/angular";
import { NoticeSkeletonComponent } from "./notice-skeleton/notice-skeleton.component";

@NgModule({
  declarations: [NoticiasComponent, NoticiaComponent, NoticeSkeletonComponent],
  imports: [CommonModule, IonicModule],
  exports: [NoticiasComponent, NoticeSkeletonComponent]
})
export class ComponentsModule {}
