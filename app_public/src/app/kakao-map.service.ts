import { Injectable } from '@angular/core';

declare const kakao: any;

@Injectable({
  providedIn: 'root'
})
export class KakaoMapService {

  private places: any;

  constructor() {
    this.places = new kakao.maps.services.Places();
  }

  searchKeyword(keyword: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.places.keywordSearch(keyword, (data: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          resolve(data);
        } else {
          reject(status);
        }
      });
    });
  }
}
