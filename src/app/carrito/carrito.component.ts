import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../servicios/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any = null;
  total: number = 0;
  errorMessage: string = '';

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.carritoService.obtenerCarrito().subscribe(
      (response) => {
        this.carrito = response.carrito;
        this.total = response.total;
        console.log(this.carrito);
        console.log(this.total);
      },
      (error) => {
        this.errorMessage = 'No se pudo cargar el carrito. Inténtalo de nuevo más tarde.';
      }
    );
  }

  actualizarCantidad(item: any, accion: 'incrementar' | 'decrementar'): void {
    if (accion === 'incrementar') {
      item.cantidad += 1;
    } else if (accion === 'decrementar' && item.cantidad > 1) {
      item.cantidad -= 1; 
    }
    this.carritoService.actualizarItem(item.id, item.cantidad).subscribe(
      () => this.cargarCarrito(),
      (error) => {
        console.error('Error al actualizar la cantidad:', error);
        if (accion === 'incrementar') {
          item.cantidad -= 1;
        } else if (accion === 'decrementar') {
          item.cantidad += 1;
        }
      }
    );
  }

  eliminarItem(item: any): void {
    this.carritoService.eliminarItem(item.id).subscribe(
      () => this.cargarCarrito(),
      (error) => console.error('Error al eliminar el producto:', error)
    );
  }
  
  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito().subscribe(
      () => this.cargarCarrito(),
      (error) => console.error('Error al vaciar el carrito:', error)
    );
  }
  
  calcularTotal(): number {
    if(!this.carrito || this.carrito.items) {
      return 0;
    }
    return this.carrito.items.reduce((total: number, item: any) => {
      return total + item.precio_unitario * item.cantidad;
    });
  }
  
}
