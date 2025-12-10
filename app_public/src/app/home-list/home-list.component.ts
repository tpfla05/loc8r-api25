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
    this.search();   // 기본 검색 (중구 기준)
  }

  search(): void {
    this.message = '검색 중...';

    this.naverSearch.search(this.keyword).subscribe({
      next: data => {
        this.locations = data;
        this.message = '';
      },
      error: () => {
        this.message = '검색 실패';
      }
    });
  }
}
