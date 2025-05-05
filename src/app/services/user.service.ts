import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; //Poder utilitzar dades asíncrones
import { User } from '../models/user.model';  // Interfaç del model

@Injectable({
  providedIn: 'root'
})
export class UserService {
  jsonUrl = '/users.json';

  constructor(private http: HttpClient) { } //Quan es crei el servei, injecta el HttpClient per les peticions

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.jsonUrl);
  }
}