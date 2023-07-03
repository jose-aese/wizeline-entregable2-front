import {Component, OnInit, NgZone} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UserService} from '../../services/user/user.service';
import {Spiner} from "../../services/spiner.service";
import {LoginUserActions} from "../../actions/user.actions";
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/app.reducer';
import {User} from 'src/app/models/userReducer.model';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  providers: [UserService],
  styleUrls: ['login.component.scss'],
})

export class LoginComponent implements OnInit {

  public formulario: FormGroup;
  public submitted = false;

  constructor(
    private _userService: UserService,
    public spiner: Spiner,
    private router: Router,
    private ngZone: NgZone,
    private store: Store<AppState>,
    private notificacionService:NotificacionService
  ) {
    this.formulario = new FormGroup({
      nick: new FormControl('', [Validators.required]
      ),
      password: new FormControl('', [Validators.required]
      ),
    });
  }

  ngOnInit() {}

  get f(): { [key: string]: AbstractControl } {
    return this.formulario.controls;
  }

  onSubmit() {
    this.submitted = true;
    const {value: {nick, password}, status} = this.formulario;
    if (status === 'INVALID') {
      return
    }

    this._userService.signup(nick, password).subscribe({
      next: (response: User) => {
        this.store.dispatch(new LoginUserActions(response));
          this.notificacionService.sendMessage({
            name:nick
          });
        this.ngZone.run(() => this.router.navigate(['/tiendas'])).then();
      },
      error: (e) => console.error(e),
      complete: () => this.spiner.close()
    });
  }

  ngDoCheck() {

  }
}
