import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpClien: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClien = httpClient;
   }
}
