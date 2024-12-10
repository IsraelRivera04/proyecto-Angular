import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplementoService {

  private apiUrl = 'http://laravel.lo/api'; 

  constructor(private http: HttpClient) { }

  getComplementos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/complementos`);
  }
  getComplementoById(id: string | null) {
    return this.http.get<any>(`${this.apiUrl}/complementos/${id}`);
  }
}
