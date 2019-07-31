import { Component, OnInit, ViewChild } from "@angular/core";
import { NoticiasService } from "../../services/noticias.service";
import { Article } from "../../interfaces/interfaces";
import { IonInfiniteScroll } from "@ionic/angular";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;
  noticias: Article[] = [];
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.loadNotices();
  }

  loadData(event) {
    console.log(event);
    this.loadNotices(event);
  }

  loadNotices(event?) {
    this.noticiasService.getTopHeadlines().subscribe(res => {
      console.log("noticias", res);
      this.noticias.push(...res.articles);
      if (event) {
        event.target.complete();
        if (res.articles.length == 0) {
          this.infiniteScroll.disabled = true;
        }
      }
    });
  }
}
