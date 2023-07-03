import {Component, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from 'src/app/services/user/user.service';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Spiner} from "../../services/spiner.service";
import {User} from "../../models/userReducer.model";


@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss'],
  providers: [UserService]
})
export class RegisterComponent {
  public formulario: FormGroup = new FormGroup({});
  public fields: string[] = [];
  public submitted = false;

  public data = [
    {name: "name", text: "First name", type: "text", validators: [Validators.required]},
    {name: "surname", text: "Last name", type: "text", validators: [Validators.required]},
    {name: "nick", text: "Username", type: "text", validators: [Validators.required]},
    {
      name: "email",
      text: "Email",
      type: "email",
      validators: [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$')]
    },
    {name: "password", text: "Password", type: "password", validators: [Validators.required]},

  ];

  constructor(
    private _userService: UserService,
    public spiner: Spiner,
    private router: Router,
    private ngZone: NgZone,
    private formBuilder: FormBuilder
  ) {

  }


  ngOnInit() {
    const formGroupFields: object = {};
    for (const {name, validators} of this.data) {
      // @ts-ignore
      formGroupFields[name] = new FormControl("", validators);
      this.fields.push(name);
    }
    this.formulario = new FormGroup(formGroupFields);
  }


  get f(): { [key: string]: AbstractControl } {
    return this.formulario.controls;
  }


  onSubmit() {
    this.submitted = true;

    const {value: user, status} = this.formulario;
    if (status === 'INVALID') {
      return
    }
    this._userService.register(user).subscribe({
      next: (response: User) => {
        this.ngZone.run(() => this.router.navigate(['/login'])).then();
      },
      error: (e: any) => console.error(e),
      complete: () => this.spiner.close()
    });
  }
}
