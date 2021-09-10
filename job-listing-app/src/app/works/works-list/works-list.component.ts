import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { WorksService, Work } from '../shared';

@Component({
  selector: 'works-list',
  templateUrl: './works-list.component.html',
  styleUrls: ['./works-list.component.scss']
})
export class WorksListComponent {
  title = 'works-listing-app';
  works: Observable<Work[]>;
  currentPage: number;
  pageSize: number = 10;

  constructor(
    private worksService: WorksService
  ) { 
    this.currentPage = 1;
    this.works = this.worksService.getWorksList(this.currentPage, this.pageSize);
  }

  loadNextPage(searchTerms: string): void {
    this.loadWorks(++this.currentPage, this.pageSize, searchTerms);
  }

  loadPreviousPage(searchTerms: string): void {
    this.loadWorks(--this.currentPage, this.pageSize, searchTerms);
  }

  searchForWorks(searchTerms: string) {
    this.currentPage = 1;
    this.loadWorks(this.currentPage, this.pageSize, searchTerms);
  }
  
  loadWorks(pageNumber: number, pageSize: number, searchTerms?: string): void {
    this.works = this.worksService.getWorksList(pageNumber, pageSize, searchTerms);
  }
}
