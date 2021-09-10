import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { Work, WorksService } from '../shared';
import { WorksListComponent } from './works-list.component';
import { routes } from '../../app-routing.module';
import { Router } from '@angular/router';

describe('WorksListComponent', () => {
  let fixture: ComponentFixture<WorksListComponent>;
  let component: WorksListComponent;
  let element: HTMLElement;
  let debugElement: DebugElement;
  let mockWorksService;
  let mockWorksList: Work[]

  beforeEach(async () => {
    mockWorksList = [
      {
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
    ]
    mockWorksService = {
      getWorksList(pageNumber = 1, pageSize = 10, searchTerms?: string): Observable<Work[]> {
        return of(mockWorksList);
      }
    }
    TestBed.overrideComponent(WorksListComponent, { set: { providers: [{ provide: WorksService, useValue: mockWorksService }]}});
    await TestBed.configureTestingModule({
      declarations: [
        WorksListComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WorksListComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    debugElement = fixture.debugElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the works list', () => {
    expect(element.querySelector('.works-list .work-title')?.textContent).toEqual(mockWorksList[0].title);
  });

  it('should route to work-details when a work is clicked', async () => {
    const location = TestBed.inject(Location);
    debugElement.nativeElement.querySelector('.works-list .work').click();
    await fixture.whenStable();
    expect(location.path()).toBe(`/work-details/${mockWorksList[0].DOI}`);
  });

  it('should pass the query terms to the getWorksList function when the search button is clicked', () => {
    const getWorksListSpy = spyOn((component as any).worksService, 'getWorksList').and.callThrough();
    debugElement.nativeElement.querySelector('.search-bar .search-input').value = 'test';
    debugElement.nativeElement.querySelector('.search-bar .button').click();
    expect(getWorksListSpy.calls.first().args[2]).toBe('test');
  })
});