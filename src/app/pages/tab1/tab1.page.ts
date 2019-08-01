import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { NoticiasService } from "../../services/noticias.service";
import { Article } from "../../interfaces/interfaces";
import { IonInfiniteScroll } from "@ionic/angular";
import { MessageService } from "../../services/message.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;
  noticias: Article[] = [];
  subscription: Subscription;

  constructor(
    private noticiasService: NoticiasService,
    private messageService: MessageService
  ) {
    this.subscribeToCountryChange();
  }

  ngOnInit(): void {
    this.loadNotices();
  }

  loadData(event) {
    this.loadNotices(event);
  }

  loadNotices(event?) {
    this.noticiasService.getTopHeadlines().subscribe(res => {
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
        this.loadNotices();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
