import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = 'http://laravel.lo/api';

  constructor(private http: HttpClient) {}

  getEventos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/eventos`);
  }

  obtenerDetallesEvento(eventoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/eventos/${eventoId}`);
  }

  inscribirse(eventoId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/eventos/${eventoId}/inscribirse`, {});
  }

  obtenerParticipantes(eventoId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/eventos/${eventoId}/participantes`);
  }
}


