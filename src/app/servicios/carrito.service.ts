import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private apiUrl = 'http://laravel.lo/api/carrito/agregar';

  constructor(private http: HttpClient) {}

  agregarJuegoAlCarrito(juegoId: number, cantidad: number): Observable<any> {
    const payload = {
      producto_id: juegoId, 
      cantidad: cantidad,
      tipo: 'juego', 
    };
    return this.http.post(this.apiUrl, payload);
  }
  agregarComplementoAlCarrito(complementoId: number, cantidad: number): Observable<any> {
    const payload = {
      producto_id: complementoId,
      cantidad: cantidad,
      tipo: 'complemento',
    };
    return this.http.post(this.apiUrl, payload);
  }

  agregarSegundaManoAlCarrito(segundaManoId: number, cantidad: number): Observable<any> {
    const payload = {
      producto_id: segundaManoId,
      cantidad: cantidad,
      tipo: 'segunda_mano', 
    };
    return this.http.post(this.apiUrl, payload);
  }

  obtenerCarrito(): Observable<any> {
    return this.http.get('http://laravel.lo/api/carrito');
  }

  actualizarItem(itemId: number, cantidad: number): Observable<any> {
    return this.http.put(`http://laravel.lo/api/carrito/actualizar/${itemId}`, { cantidad });
  }
  
  eliminarItem(itemId: number): Observable<any> {
    return this.http.delete(`http://laravel.lo/api/carrito/eliminar/${itemId}`);
  }
  
  vaciarCarrito(): Observable<any> {
    return this.http.delete('http://laravel.lo/api/carrito/vaciar');
  }

  finalizarCompra(datosCompra: any): Observable<any> {
    return this.http.post('http://laravel.lo/api/compra/procesar', datosCompra);
  }
  
}


