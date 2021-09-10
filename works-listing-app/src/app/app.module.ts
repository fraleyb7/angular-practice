import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { WorkDetailComponent } from './works/work-detail/work-detail.component';
import { WorksListComponent } from './works/works-list/works-list.component';

@NgModule({
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
