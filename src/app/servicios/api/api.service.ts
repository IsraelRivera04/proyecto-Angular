import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = "http://laravel.lo/api"; 

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
        tap((response: any) => {
            if (response.token) {
                localStorage.setItem('token', response.token); // Guarda el token
                localStorage.setItem('currentUser', JSON.stringify(response)); // Guarda toda la información del usuario
            }
        })
    );
}




  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`);
  }
}







