import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../servicios/carrito.service';

@Component({
  selector: 'app-compra-finalizar',
  templateUrl: './compra-finalizar.component.html',
  styleUrls: ['./compra-finalizar.component.css'],
})
export class CompraFinalizarComponent implements OnInit {
  carrito: any = { items: [] };
  direccion: string = '';
  telefono: string = '';
  metodoPago: string = 'tarjeta';

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.carritoService.obtenerCarrito().subscribe((data) => {
      this.carrito = data;
      console.log('carrito cargado', this.carrito);
    });
  }

  confirmarCompra(): void {
    const datosCompra = {
      direccion: this.direccion,
      telefono: this.telefono,
      metodo_pago: this.metodoPago,
    };

    this.carritoService.finalizarCompra(datosCompra).subscribe(
      (response) => {
        alert('Compra realizada con éxito');
        const pedidoId = response.pedido.id;
        this.router.navigate([`/compra/confirmacion/${pedidoId}`]);
      },
      (error) => {
        console.error('Error al procesar la compra:', error);
      }
    );
  }
}


