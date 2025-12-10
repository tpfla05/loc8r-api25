import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NaverSearchService {

  private API_URL = "https://loc8r-api25.onrender.com/api/naver/search";

  constructor(private http: HttpClient) {}

  search(query: string) {
    return this.http.get<any[]>(`${this.API_URL}?query=${query}`);
  }
}
