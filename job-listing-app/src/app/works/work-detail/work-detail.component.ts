import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Work, WorksService } from '../shared';

@Component({
  selector: 'work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.scss']
})
export class WorkDetailComponent {
  title = 'works-listing-app';
  work: Observable<Work>;

  constructor(
    private route: ActivatedRoute,
    private worksService: WorksService
  ) {
    this.work = this.worksService.getWork(this.route.snapshot.paramMap.get('DOI')!);
  }
}
