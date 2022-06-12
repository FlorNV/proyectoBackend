import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasajeService {

  urlBase: string = 'http://localhost:3000/api/viajes/pasajes';

  constructor(private _http: HttpClient) { }

  getPasajes(): Observable<any> {
    const options = {
      headers: new HttpHeaders({})
    }
    return this._http.get(this.urlBase, options);
  }

  getPasajesByCategoria(categoria: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({}),
      params: new HttpParams().set('categoria', categoria)
    }
    return this._http.get(this.urlBase + '/categoria', options);
  }
}
