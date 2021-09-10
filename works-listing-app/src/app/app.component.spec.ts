import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { WorkDetailComponent } from './works/work-detail/work-detail.component';
import { WorksListComponent } from './works/works-list/works-list.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        WorkDetailComponent,
        WorksListComponent,
        HeaderComponent
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'works-listing-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('works-listing-app');
  });

  it('should contain', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.childElementCount).toEqual(2);
  });
});
