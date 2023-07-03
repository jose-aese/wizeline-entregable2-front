import {User, UserReducer} from "../models/userReducer.model";
import {
  LOGIN, LoginUserActions
} from "../actions/user.actions";


export function userReducer(
  state: UserReducer = {_id: "", name: "", surname: "", nick: "", email: "", role: "", image: "", token: ""},
  action: LoginUserActions
): UserReducer {
  switch (action.type) {
    case LOGIN:
      return action.user;
    default:
      return state;
  }
}
