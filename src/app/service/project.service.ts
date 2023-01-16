import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Project } from '../models/Project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
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

  createProject(project: Project): Observable<any> {
    let token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      authorization: 'Bearer ' + token
    });
    return this.httpClient.post('http://localhost:8080/private/project/create', project, { responseType: 'text', headers: headers });
  }

  getProjects(): Observable<any> {
    let token = localStorage.getItem("token")
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+token);
    return this.httpClient.get('http://localhost:8080/private/project/owner', { 'headers': headers });
  }
}
