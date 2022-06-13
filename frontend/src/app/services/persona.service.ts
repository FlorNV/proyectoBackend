import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  urlBase: string = 'http://localhost:3000/api/viajes/personas';

  constructor(private _http: HttpClient) { }

  getPersonas(): Observable<any> {
    const options = {
      headers: new HttpHeaders({})
    }
    return this._http.get(this.urlBase, options);
  }
}
