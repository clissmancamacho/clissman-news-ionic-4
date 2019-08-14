import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { IonSegment, IonInfiniteScroll } from "@ionic/angular";
import { NoticiasService } from "../../services/noticias.service";
import { Article } from "../../interfaces/interfaces";
import { Subscription } from "rxjs";
import { MessageService } from "../../services/message.service";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page implements OnInit, OnDestroy {
  @ViewChild(IonSegment, null) segment: IonSegment;
  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;
  categorias = [
    { name: "Negocios", value: "business" },
    { name: "Tecnología", value: "technology" },
    { name: "Ciencia", value: "science" },
    { name: "Salud", value: "health" },
    { name: "Deportes", value: "sports" },
    { name: "Entretenimiento", value: "entertainment" }
  ];
  noticias: Article[] = [];
  subscription: Subscription;
  constructor(
    private noticiasService: NoticiasService,
    private messageService: MessageService
  ) {
    this.subscribeToCountryChange();
  }

  ngOnInit() {
    this.segment.value = this.categorias[0].value;
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
      // console.log(res);
      this.noticias.push(...res.articles);
      if (event) {
        event.target.complete();
        if (res.articles.length == 0) {
          this.infiniteScroll.disabled = true;
        }
      }
    });
  }
  subscribeToCountryChange() {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message.text === "RefreshNotices") {
        this.noticias = [];
        this.loadNotices(this.segment.value);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
