import { DebugElement } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AppRoutingModule } from '../../app-routing.module';
import { Work, WorksService } from '../shared';
import { WorkDetailComponent } from './work-detail.component';

describe('WorksListComponent', () => {
  let fixture: ComponentFixture<WorkDetailComponent>;
  let component: WorkDetailComponent;
  let element: HTMLElement;
  let debugElement: DebugElement;
  let mockWorksService;
  let mockWork: Work;

  beforeEach(async () => {
    mockWork = {
      DOI: '123/456',
      'container-title': 'Some title',
      volume: '1',
      title: 'Article title',
      URL: 'www.test.com',
      subject: ['Math'],
      type: 'Journal',
      publisher: 'Me',
      published: { 'date-parts': [[2020, 9]]}
    }
    mockWorksService = {
      getWork(DOI: string): Observable<Work> {
        return of(mockWork);
      }
    }
    TestBed.overrideComponent(WorkDetailComponent, { set: { providers: [{ provide: WorksService, useValue: mockWorksService }]}});
    await TestBed.configureTestingModule({
      declarations: [
        WorkDetailComponent
      ],
      imports: [
        AppRoutingModule
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WorkDetailComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    debugElement = fixture.debugElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the work', () => {
    expect(element.querySelector('.work-title')?.textContent).toEqual(mockWork.title);
  });
});