import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TiendasService {
  private urlService = environment.urlService;

  constructor(public _http: HttpClient) {
  }


  tiendas(numeroRegistros: number = 10): Observable<any> {
    const body = {
      filtros: [],
      numeroRegistros
    };
    return <Observable<any>>this._http.post(this.urlService + '/tiendas', body);
  }

  tiendasByPage(paginaSiguiente: string, numeroRegistros: number = 10): Observable<any> {
    const url = `${this.urlService}/tiendas`;
    const body = {
      filtros: [],
      numeroRegistros,
      paginaSiguiente,
    };
    return <Observable<any>>this._http.post(url, body);
  }
}
