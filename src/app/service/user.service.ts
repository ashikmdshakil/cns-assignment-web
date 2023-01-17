import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Credential } from '../models/Credential.model';
import { Project } from '../models/Project.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  ipAdress: string = "127.0.0.1:8080/";

  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
   }

   private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
       Swal.fire({
        icon: 'error',
        title: 'Your are not authorized.',
        showConfirmButton: false,
        timer: 1800

      }) 
    }
    if (error.status === 403) {
      Swal.fire({
       icon: 'error',
       title: 'Your are not authorized.',
       showConfirmButton: false,
       timer: 1800

     }) 
   }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timer: 1800

      })
    }
    return throwError(new Error(""));
  }

   authenticateUser(credential: Credential): Observable<any> {
    const headers = new HttpHeaders({
      authorization: 'Basic ' + btoa(credential.name + ':' + credential.password)
    });

    return this.httpClient.get('http://localhost:8080/public/authenticateUser', { headers: headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  registerUser(user: User): Observable<any> {
    return this.httpClient.post('http://localhost:8080/public/registerUser', user, { 'responseType': 'text' })
    .pipe(
      catchError(this.handleError)
    )
  }

}
