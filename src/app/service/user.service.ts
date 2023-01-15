import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  ip: string = "127.0.0.1:8080/";

  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
   }

   private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      /* Swal.fire({
        icon: 'error',
        title: 'Your are not authorized.',
        showConfirmButton: false,
        timer: 1800

      }) */
    }
    else {
      /* Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timer: 1800

      }) */
    }
    return throwError(new Error(""));
  }

   authenticateUser(userName: string, password: string, roleName: string): Observable<any> {
    const headers = new HttpHeaders({
      authorization: 'Basic ' + btoa(userName + ':' + password)
    });
    let param = new HttpParams()
      .set('role', roleName);

    return this.httpClient.get(this.ip + '/public/authenticateUser', { headers: headers, params: param })
      .pipe(
        catchError(this.handleError)
      )
  }
}
