import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private apiUrl = 'http://laravel.lo/api';


  constructor(private http: HttpClient) {}


  // Obtén el token desde localStorage (o donde lo guardes)
  private getToken(): string | null {
    return localStorage.getItem('token');
  }


  // Genera headers con el token
  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }


  procesarCompra(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/compra/procesar`, data, { headers });
  }


  obtenerConfirmacion(pedidoId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/compra/confirmacion/${pedidoId}`, { headers });
  }


  descargarPDF(pedidoId: number): void {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    const url = `${this.apiUrl}/compra/descargarPDF/${pedidoId}`;
    // Crear una ventana con la solicitud y el token
    const pdfWindow = window.open('', '_blank');
    fetch(url, { headers })
      .then((response) => response.blob())
      .then((blob) => {
        const urlBlob = URL.createObjectURL(blob);
        if (pdfWindow) {
          pdfWindow.location.href = urlBlob;
        }
      })
      .catch((error) => {
        console.error('Error al descargar el PDF:', error);
      });
  }
  
  
}






