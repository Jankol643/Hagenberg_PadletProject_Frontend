import { Injectable } from '@angular/core';
import {Padlet, Entry} from "./padlet";
import { HttpClient } from "@angular/common/http";
import {Observable, throwError } from "rxjs";
import {catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PadletStoreService {

  private api = 'http://padletproject23.s1910456014.student.kwmhgb.at/api';


  constructor(private http : HttpClient) {
  }

  public getAll() : Observable<Array<Padlet>> {
    return this.http.get<Array<Padlet>>(`${this.api}/padlets`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  public getSingle(id: number) : Observable<Padlet>{
    return this.http.get<Padlet>(`${this.api}/padlets/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create (padlet: Padlet) : Observable<any> {
    return this.http.post(`${this.api}/padlets`, padlet).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update (padlet: Padlet) : Observable<any> {
    return this.http.put(`${this.api}/padlets/${padlet.id}`, padlet).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove (id: number) : Observable<any> {
    return this.http.delete(`${this.api}/padlets/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler (error: Error | any) : Observable<any> {
    return throwError(error);
  }
}
