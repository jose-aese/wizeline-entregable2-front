import {Injectable} from '@angular/core';
import {
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import {throwError, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import Swal from 'sweetalert2'
import {Spiner} from '../services/spiner.service';


@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(public spiner: Spiner) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spiner.open();
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const {error: {message = ''} = {}} = error
          Swal.fire({
            icon: 'error',
            text: message,
            timer: 4000,
            timerProgressBar: true,
            showCloseButton: false,
            showConfirmButton: false
          }).then(r => this.spiner.close());
          return throwError(() => error);
        })
      )
  }
}
