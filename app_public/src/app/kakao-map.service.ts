import { Injectable } from '@angular/core';

declare const kakao: any;

@Injectable({
  providedIn: 'root'
})
export class KakaoMapService {

  private places: any;

  constructor() {
    // SDK 파일이 로드되었는지 확인
    if (!window.hasOwnProperty('kakao')) {
      console.error('❌ Kakao SDK 파일을 불러오지 못했습니다.');
      return;
    }

    // autoload=false 이므로 반드시 직접 load() 호출해야 함
    kakao.maps.load(() => {
      console.log('✅ Kakao SDK Loaded');
      this.places = new kakao.maps.services.Places();
    });
  }

  searchKeyword(keyword: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (!this.places) {
        console.warn('⏳ Kakao SDK 아직 초기화되지 않음 → 잠시 후 다시 시도 필요');
        reject('Kakao SDK not initialized');
        return;
      }

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
