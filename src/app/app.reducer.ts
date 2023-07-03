import {ActionReducerMap} from '@ngrx/store';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import {Params} from '@angular/router';
import {UserReducer} from "./models/userReducer.model";
import {userReducer} from "./reducer/users.reducer";

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
  identityReducer:  UserReducer

}

export const appReducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  // @ts-ignore
  identityReducer: userReducer
};
