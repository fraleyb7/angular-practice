import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';

import { WorkDetailComponent } from './works/work-detail/work-detail.component';
import { WorksListComponent } from './works/works-list/works-list.component';

const workDetailsMatcher = (segments: UrlSegment[]) => {
  if (segments[0].path === 'work-details' && segments.length === 3) {
    return {
      consumed: segments,
      posParams: {
        DOI: new UrlSegment(segments.slice(1).join('/'), {})
      }
    }
  }
  return null;
}

export const routes: Routes = [
  { path: '', redirectTo: '/works', pathMatch: 'full' },
  { path: 'works', component: WorksListComponent },
  { matcher: workDetailsMatcher, component: WorkDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}