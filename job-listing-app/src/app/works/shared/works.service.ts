import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Work, WorkResponse, WorksListResponse } from './models';

@Injectable({ providedIn: 'root' })
export class WorksService {
  baseUrl = 'http://api.crossref.org';

  constructor(
    private http: HttpClient
  ) { }

  getWorksList(pageNumber = 1, pageSize = 10, searchTerms?: string): Observable<Work[]> {
    const options = {
      params: {
        rows: pageSize,
        offset: (pageNumber-1)*pageSize,
        ...(searchTerms != null && searchTerms !== '' && { query: searchTerms})
      }
    }

    return this.http.get<WorksListResponse>(`${this.baseUrl}/works`, options)
      .pipe(
        map(response => response.message.items),
        catchError(this.handleError<Work[]>('getWorksList', [])
      )
    );
  }

  getWork(DOI: string): Observable<Work> {
    return this.http.get<WorkResponse>(`${this.baseUrl}/works/${DOI}`)
      .pipe(
        map(response => response.message),
        catchError(this.handleError<Work>('getWork', {} as any)
      )
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}