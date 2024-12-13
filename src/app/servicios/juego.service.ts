import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getJuegosOrdenados(ordenNombre: string, tipo: string): Observable<any> {
    const params = { orden_nombre: ordenNombre, tipo: tipo };
    return this.http.get<any>(`${this.apiUrl}/juegos`, { params });
  }
  }


