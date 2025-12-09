import { Component, OnInit } from '@angular/core';
import { KakaoMapService } from '../kakao-map.service';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  public keywords: string[] = ['카페', '음식점', '분식', '치킨', '한식', '편의점'];
  public searchKeyword: string = this.keywords[0];

  public locations: any[] = [];
  public message = '';

  constructor(
    private kakaoMapService: KakaoMapService,
    private geolocationService: GeolocationService
  ) {}

  ngOnInit(): void {
    this.searchCafes();
  }

  // 기존 HTML: (click)="searchCafes()"
  searchCafes(): void {
    this.message = '검색 중...';

    this.kakaoMapService.searchKeyword(this.searchKeyword)
      .then(data => {
        // Kakao JS API는 distance, place_url이 없으므로 HTML이 깨지지 않도록 처리
        this.locations = data.map((item: any) => ({
          ...item,
          distance: item.distance ?? 0,              // distance 없으면 0
          place_url: item.place_url ?? item.place_url  // JS API는 place_url 없음
        }));

        this.message = '';
      })
      .catch(err => {
        console.error(err);
        this.message = '검색 결과가 없습니다.';
        this.locations = [];
      });
  }
}
