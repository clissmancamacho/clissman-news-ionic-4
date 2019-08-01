import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ResponseTopHeadlines } from "../interfaces/interfaces";
import { environment as env } from "../../environments/environment";
import { DataLocalService } from "./data-local.service";

const headers = new HttpHeaders({
  "X-Api-key": env.newsApiKey
});

@Injectable({
  providedIn: "root"
})
export class NoticiasService {
  headlinesPageNumber: number = 0;
  actualCategory: string;
  categoryPageNumber: number = 0;
  countryCode: string;
  constructor(
    private http: HttpClient,
    public dataLocalService: DataLocalService
  ) {
    this.checkCountryCodeAndHandlePageNumber();
  }

  private executeQuery<T>(query: string) {
    query = env.newsApiUrl + query;
    return this.http.get<T>(query, { headers });
  }

  getTopHeadlines() {
    this.headlinesPageNumber++;
    this.checkCountryCodeAndHandlePageNumber("headlines");
    return this.executeQuery<ResponseTopHeadlines>(
      `/top-headlines?country=${this.countryCode}&page=${
        this.headlinesPageNumber
      }`
    );
    // return this.http.get<ResponseTopHeadlines>(
    //   `${
    //     env.newsApiKey
    //   }/top-headlines?country=us&category=business&apiKey=abe2aee975834ac5850dc53c0cf59c48`
    // );
  }

  getTopHeadlinesByCategory(category: string) {
    if (this.actualCategory === category) {
      this.categoryPageNumber++;
    } else {
      this.categoryPageNumber = 1;
      this.actualCategory = category;
    }
    this.checkCountryCodeAndHandlePageNumber("category");

    // return this.http.get<ResponseTopHeadlines>(
    //   `https://newsapi.org/v2/top-headlines?country=de&category=${category}&apiKey=abe2aee975834ac5850dc53c0cf59c48`
    // );
    return this.executeQuery<ResponseTopHeadlines>(
      `/top-headlines?country=${this.countryCode}&category=${category}&page=${
        this.categoryPageNumber
      }`
    );
  }

  checkCountryCodeAndHandlePageNumber(mode?) {
    if (this.dataLocalService.preferenceCountryCode !== this.countryCode) {
      this.countryCode = this.dataLocalService.preferenceCountryCode;
      if (mode == "category") {
        this.categoryPageNumber = 0;
      } else {
        this.headlinesPageNumber = 0;
      }
    }
  }
}
