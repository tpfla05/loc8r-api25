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

  // HTML: (click)="searchCafes()"
  searchCafes(): void {
    this.message = '검색 중...';

    this.kakaoMapService.searchKeyword(this.searchKeyword)
      .then(data => {
        this.locations = data.map((item: any) => ({
          ...item,
          distance: item.distance ?? 0, // HTML에서 distance 사용하니까 기본값 추가
          place_url: item.place_url ?? '' // place_url 없을 때 대비
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
