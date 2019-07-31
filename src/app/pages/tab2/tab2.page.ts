import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSegment, IonInfiniteScroll } from "@ionic/angular";
import { NoticiasService } from "../../services/noticias.service";
import { Article } from "../../interfaces/interfaces";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment, null) segment: IonSegment;
  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;
  categorias = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology"
  ];
  noticias: Article[] = [];
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.loadNotices(this.segment.value);
  }

  segmentChange(event) {
    this.noticias = [];
    this.loadNotices(event.detail.value);
  }

  loadData(event) {
    this.loadNotices(this.segment.value, event);
  }

  loadNotices(category: string, event?) {
    this.noticiasService.getTopHeadlinesByCategory(category).subscribe(res => {
      console.log(res);
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
