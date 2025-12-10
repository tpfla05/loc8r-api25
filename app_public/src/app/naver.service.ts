import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NaverSearchService {

  private server = "https://loc8r-api25.onrender.com";

  constructor(private http: HttpClient) {}

  // 검색
  search(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.server}/api/naver/search?query=${keyword}`);
  }

  // reverse geocode
  reverse(lat: number, lng: number): Observable<any> {
    return this.http.get<any>(
      `${this.server}/api/naver/reverse?lat=${lat}&lng=${lng}`
    );
  }
}
