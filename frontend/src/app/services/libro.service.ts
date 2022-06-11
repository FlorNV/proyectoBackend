import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  urlBase: string = 'http://localhost:3000/api/libros';

  constructor(private _http: HttpClient) { }

  getLibros(): Observable<any>{
    const options = {
      headers: new HttpHeaders({}),
      params: new HttpParams({})
    }
    return this._http.get(this.urlBase, options);
  }

  getLibrosDestacados(): Observable<any>{
    const options = {
      headers: new HttpHeaders({}),
      params: new HttpParams({})
    }
    return this._http.get(this.urlBase + '/destacados', options);
  }

  addLibro(libro: Libro): Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    const body = JSON.stringify(libro);
    return this._http.post(this.urlBase, body, options);
  }
}