import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; //Poder utilitzar dades asíncrones
import { User } from '../model/user.model'; // Interfaç del model

@Injectable({
  providedIn: 'root',
})
export class UserService {
  jsonUrl = '/users.json';

  constructor(private http: HttpClient) {} //Quan es crei el servei, injecta el HttpClient per les peticions

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  addUsers(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/users', user); //S'envia l'user al backend
  }
}
