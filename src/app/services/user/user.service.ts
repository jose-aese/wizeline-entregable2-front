import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/userReducer.model';
import {environment} from 'src/environments/environment';


@Injectable()
export class UserService {
  public identity: any;
  public token: string | null = null;
  private urlService = environment.urlService;

  constructor(public _http: HttpClient) {
  }

  register(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.urlService + 'users', params, {headers: headers});
  }

  signup(nick: string, password: string): Observable<any> {
    let params = JSON.stringify({nick, password, token: true});
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return <Observable<any>>this._http.post(this.urlService + 'login', params, {headers: headers});
  }

}
