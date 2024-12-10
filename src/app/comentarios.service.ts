import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private baseUrl = 'http://laravel.lo/api';

  constructor(private http: HttpClient) {}

  agregarComentario(juegoId: number, datos: { comentario: string; valoracion: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/juegos/${juegoId}/comentarios`, datos);
  }

  obtenerComentarios(juegoId: number): Observable<any> { 
    return this.http.get(`${this.baseUrl}/juegos/${juegoId}/comentarios`); 
  }

}



