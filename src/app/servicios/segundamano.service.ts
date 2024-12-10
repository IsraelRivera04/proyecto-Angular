import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SegundaManoService {
  private apiUrl = 'http://laravel.lo/api/segunda-mano'; 

  constructor(private http: HttpClient) {}

  getJuegosSegundaMano(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getJuegoById(id: string | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}

