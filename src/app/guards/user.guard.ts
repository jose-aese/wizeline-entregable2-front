import {Injectable} from '@angular/core';
import {Router,} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subject, take} from 'rxjs';

import {AppState} from '../app.reducer';
import {UserService} from '../services/user/user.service';
import {UserReducer} from "../models/userReducer.model";

;


@Injectable()
export class AuthGuard {
  constructor(
    private _router: Router,
    private _userService: UserService,
    private store: Store<AppState>,
  ) {
  }

  canActivate() {

    this.store.select('identityReducer')
      .pipe(take(1))
      .subscribe((identityReducer: UserReducer) => {
        if (!identityReducer || !identityReducer.token) {
          this._router.navigate(['/login']);
        }
       return true
      });
  }
}

