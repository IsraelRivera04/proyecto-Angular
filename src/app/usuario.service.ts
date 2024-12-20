import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://laravel.lo/api'; 

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios`);
  }

  obtenerUsuarioAutenticado(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios/me`);
  }
}
