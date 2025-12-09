import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KakaoService {

  private baseUrl = 'https://dapi.kakao.com/v2/local/search/keyword.json';

  constructor(private http: HttpClient) {}

  searchCafes(keyword: string, x: number, y: number, radius: number = 2000): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `KakaoAK ${environment.kakaoApiKey}`
    });

    const url = `${this.baseUrl}?query=${encodeURIComponent(keyword)}&x=${x}&y=${y}&radius=${radius}&sort=distance`;

    return this.http.get(url, { headers });
  }
}
