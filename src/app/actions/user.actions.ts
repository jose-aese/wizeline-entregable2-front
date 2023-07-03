import { Action } from '@ngrx/store';
import { User } from '../models/userReducer.model';


export const LOGIN = '[USER] User Login';

export class LoginUserActions implements Action {
  readonly type = LOGIN;

  constructor( public user: User ) {
  }
}



export type Acciones = [LoginUserActions];
