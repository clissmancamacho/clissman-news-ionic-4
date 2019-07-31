import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Article } from "../interfaces/interfaces";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class DataLocalService {
  favoriteNotices: Article[] = [];
  constructor(private storage: Storage, private toastCtrl: ToastController) {
    this.loadFavoriteNotices();
  }

  saveFavoriteNotices(notice: Article) {
    const exist = this.favoriteNotices.find(noti => noti.url === notice.url);
    if (!exist) {
      this.favoriteNotices.unshift(notice);
      this.storage.set("favoriteNotices", this.favoriteNotices);
      // Show toast info
      this.presentToast("Agregado a favoritos");
    } else {
      this.presentToast("Esta noticia ya está en favoritos");
    }
  }

  async loadFavoriteNotices() {
    const favoriteNotices = await this.storage.get("favoriteNotices");
    if (favoriteNotices) {
      this.favoriteNotices = favoriteNotices;
    }
  }

  deleteFavoriteNotice(notice: Article) {
    this.favoriteNotices = this.favoriteNotices.filter(
      noti => noti.url !== notice.url
    );
    this.storage.set("favoriteNotices", this.favoriteNotices);
    // Show toast info
    this.presentToast("Noticia eliminada de favoritos");
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }
}
