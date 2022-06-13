import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pasaje } from '../models/pasaje';

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
    return this._http.get(this.urlBase + '/listado', options);
  }

  getPasajesByCategoria(categoria: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({}),
      params: new HttpParams().set('categoria', categoria)
    }
    return this._http.get(this.urlBase, options);
  }

  addPasaje(pasaje: Pasaje): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    const body = JSON.stringify(pasaje);
    return this._http.post(this.urlBase, body, options);
  }

  getPasaje(id: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({})
    }
    return this._http.get(this.urlBase + '/' + id, options);
  }

  updatePasaje(pasaje: Pasaje): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    const body = JSON.stringify(pasaje);
    return this._http.put(this.urlBase + '/' + pasaje._id, body, options);
  }

  deletePasaje(pasaje: Pasaje): Observable<any> {
    const options = {
      headers: new HttpHeaders({})
    }
    return this._http.delete(this.urlBase + '/' + pasaje._id, options);
  }
}
