import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RandomUserService {
  private apiUrl = 'https://randomuser.me/api';

  constructor(private http: HttpClient) {}

  getUserPhoto(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
