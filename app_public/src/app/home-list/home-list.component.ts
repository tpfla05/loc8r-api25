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

  constructor(private naverSearch: NaverSearchService) {}

  ngOnInit(): void {
  this.searchByCurrentLocation();
}

searchByCurrentLocation() {
  this.message = "현재 위치 기반 검색 중...";

  navigator.geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      this.naverSearch.reverse(lat, lng).subscribe(addrData => {

        const area =
          addrData.results?.[0]?.region?.area2?.name +
          " " +
          addrData.results?.[0]?.region?.area3?.name;

        const keyword = area + " " + this.keyword;

        this.search(keyword);
      });
    },
    err => {
      this.message = "위치 정보를 가져올 수 없습니다.";
    }
  );
}

search(keyword: string) {
  this.naverSearch.search(keyword).subscribe({
    next: data => {
      this.locations = data;
      this.message = "";
    },
    error: () => {
      this.message = "검색 실패";
    }
  });
}

}
