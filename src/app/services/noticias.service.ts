import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ResponseTopHeadlines } from "../interfaces/interfaces";
import { env } from "../../environments/environment";

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
  constructor(private http: HttpClient) {}

  private executeQuery<T>(query: string) {
    query = env.newsApiUrl + query;
    return this.http.get<T>(query, { headers });
  }

  getTopHeadlines() {
    this.headlinesPageNumber++;
    return this.executeQuery<ResponseTopHeadlines>(
      `/top-headlines?country=us&page=${this.headlinesPageNumber}`
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
    // return this.http.get<ResponseTopHeadlines>(
    //   `https://newsapi.org/v2/top-headlines?country=de&category=${category}&apiKey=abe2aee975834ac5850dc53c0cf59c48`
    // );
    return this.executeQuery<ResponseTopHeadlines>(
      `/top-headlines?country=us&category=${category}&page=${
        this.categoryPageNumber
      }`
    );
  }
}
