import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NaverSearchService {

  private server = "https://loc8r-api25.onrender.com";

  constructor(private http: HttpClient) {}

  // 🔥 현재 위치 기반Places 검색
  searchNearby(lat: number, lng: number, keyword: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.server}/api/naver/nearby?lat=${lat}&lng=${lng}&query=${keyword}`
    );
  }
}
