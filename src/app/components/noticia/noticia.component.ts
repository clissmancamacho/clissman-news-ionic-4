import { Component, OnInit, Input } from "@angular/core";
import { Article } from "../../interfaces/interfaces";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { ActionSheetController } from "@ionic/angular";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { DataLocalService } from "../../services/data-local.service";

@Component({
  selector: "app-noticia",
  templateUrl: "./noticia.component.html",
  styleUrls: ["./noticia.component.scss"]
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() index: number;
  @Input() inFavoritePage: boolean;

  constructor(
    private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService
  ) {}

  ngOnInit() {}

  openNotice() {
    // console.log("noticia", this.noticia.url);
    // _system open link on native mobile browser
    const browser = this.iab.create(this.noticia.url, "_system");
  }

  async launchMenu() {
    let saveOrEraseFavoriteButton;

    if (this.inFavoritePage) {
      // Erase favorites
      saveOrEraseFavoriteButton = {
        text: "Quitar de favoritos",
        icon: "trash",
        cssClass: "action-dark",
        handler: () => {
          // console.log("Borrar de Favorito");
          this.dataLocalService.deleteFavoriteNotice(this.noticia);
        }
      };
    } else {
      // save favorites
      saveOrEraseFavoriteButton = {
        text: "Favorito",
        icon: "star",
        cssClass: "action-dark",
        handler: () => {
          // console.log("Favorito");
          this.dataLocalService.saveFavoriteNotices(this.noticia);
        }
      };
    }
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: "Compartir",
          icon: "share",
          cssClass: "action-dark",
          handler: () => {
            this.socialSharing.share(
              this.noticia.title,
              this.noticia.source.name,
              "",
              this.noticia.url
            );
          }
        },
        saveOrEraseFavoriteButton,
        {
          text: "Cancelar",
          icon: "close",
          role: "cancel",
          cssClass: "action-dark",
          handler: () => {
            // console.log("Cancel clicked");
          }
        }
      ]
    });
    await actionSheet.present();
  }
}
