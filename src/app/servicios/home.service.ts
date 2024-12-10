import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly apiUrl = 'http://laravel.lo/api';

  constructor(private http: HttpClient) {}

  obtenerJuegosDestacados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/juegos-destacados`);
  }

  obtenerComplementosPopulares(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/complementos-populares`);
  }

  obtenerProximosEventos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/proximos-eventos`);
  }
}
