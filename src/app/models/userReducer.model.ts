export interface UserReducer {
  _id: string,
  name: string,
  surname: string,
  nick: string,
  email: string,
  password?: string | null,
  role: string,
  image?: string,
  token?: string
}

export class User implements UserReducer {

  constructor(public _id: string,
              public name: string,
              public surname: string,
              public nick: string,
              public email: string,
              public role: string,
              public token: string,
              public password?: string | null,
              public image?: string,
  ) {
  }
}


