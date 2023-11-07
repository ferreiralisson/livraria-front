import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Error404Component } from '../error404/error404.component';
import { ErrorDTO } from '../model/error-dto';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor(
    private dialog: MatDialog
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        let errorDTO: ErrorDTO = JSON.parse(err.error);

        if (errorDTO.status === 404) {
          this.dialog.open(Error404Component, {
            height: '500px',
            width: '400px',
            data: {
              message: errorDTO.details
            }
          });
        }

        return throwError(err.error);
      })
    );
  }
}
