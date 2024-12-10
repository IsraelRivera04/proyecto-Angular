import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  private apiUrl = 'http://laravel.lo/api';

  constructor(private http: HttpClient) {}

  getJuegos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/juegos`);
  }
  getJuegoById(id: string | null) {
    return this.http.get<any>(`${this.apiUrl}/juegos/${id}`);
  }
  
}

