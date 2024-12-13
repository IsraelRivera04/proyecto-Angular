import { Component, OnInit } from '@angular/core';
import { ComplementoService } from '../servicios/complemento.service';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-complementos-list',
  templateUrl: './complementos-list.component.html',
  styleUrls: ['./complementos-list.component.css']
})
export class ComplementosListComponent implements OnInit {
  complementos: any[] = [];
  errorMessage: string = ''; 
  isNombreOrdenado: boolean = false;  
  isPrecioOrdenado: boolean = false;  

  constructor(
    private complementoService: ComplementoService,
    private carritoService : CarritoService
  ) {}

  ngOnInit(): void {
    this.cargarComplementos();
  }

  cargarComplementos(orden: string = 'asc', tipo: string = 'nombre'): void {
    this.complementoService.getComplementos().subscribe(
      (response) => {
        if (response.data) {
          this.complementos = response.data;
        } else {
          this.complementos = response;
        }
        if (tipo === 'nombre') {
          this.ordenarPorNombre(orden);
        } else if (tipo === 'precio') {
          this.ordenarPorPrecio(orden);
        }
      },
      (error) => {
        console.error('Error al obtener los complementos:', error);
        this.errorMessage = 'No se pudieron cargar los complementos. Inténtalo de nuevo más tarde.';
      }
    );
  }

  ordenarPorNombre(orden: string): void {
    if (orden === 'asc') {
      this.complementos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else {
      this.complementos.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }
  }

  ordenarPorPrecio(orden: string): void {
    this.complementos.sort((a, b) => {
      const precioA = a.precio_oferta || a.precio;
      const precioB = b.precio_oferta || b.precio;

      if (orden === 'asc') {
        return precioA - precioB;
      } else {
        return precioB - precioA;
      }
    });
  }

  cambiarOrdenNombre(event: any): void {
    const orden = event.target.value;
    if (orden) {
      this.isNombreOrdenado = true;
      this.isPrecioOrdenado = false;
      this.cargarComplementos(orden, 'nombre');
    }
  }

  cambiarOrdenPrecio(event: any): void {
    const orden = event.target.value;
    if (orden) {
      this.isPrecioOrdenado = true;
      this.isNombreOrdenado = false; 
      this.cargarComplementos(orden, 'precio');
    }
  }

  agregarAlCarrito(complemento: any): void {
    const cantidad = 1;
    this.carritoService.agregarComplementoAlCarrito(complemento.id, cantidad).subscribe(
      (response) => {
        console.log('Complemento añadido al carrito:', response);
      },
      (error) => {
        console.error('Error al añadir el complemento al carrito:', error);
        this.errorMessage = 'No se pudo agregar el complemento al carrito. Inténtalo de nuevo más tarde.';
      }
    );
  }
}


