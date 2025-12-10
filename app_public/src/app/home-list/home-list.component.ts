import { Component, OnInit } from '@angular/core';
import { NaverSearchService } from '../naver.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  public keyword = '카페';
  public locations: any[] = [];
  public message = '';

  constructor(private naver: NaverSearchService) {}

  ngOnInit(): void {
    this.loadNearby();
  }

  loadNearby() {
    this.message = "현재 위치 기반 검색 중...";

    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        this.naver.searchNearby(lat, lng, this.keyword).subscribe({
          next: data => {
            this.locations = data;
            this.message = "";
          },
          error: () => {
            this.message = "검색 실패";
          }
        });
      },
      () => {
        this.message = "위치 정보를 가져올 수 없습니다.";
      }
    );
  }

  search() {
    this.loadNearby();
  }
}
