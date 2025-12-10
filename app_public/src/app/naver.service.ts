import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NaverSearchService {

  private apiUrl = 'https://loc8r-api25.onrender.com/api/naver/search';

  constructor(private http: HttpClient) {}

  // 기존 검색
  search(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?query=${keyword}`);
  }

  // ⭐ 위치 기반 검색 추가
  searchByLocation(keyword: string, lat: number, lng: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?query=${keyword}&lat=${lat}&lng=${lng}`);
  }
}
