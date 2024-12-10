import { Component, OnInit } from '@angular/core';
import { ComplementoService } from '../servicios/complemento.service';
import { CarritoService } from 'src/app/servicios/carrito.service';


@Component({
  selector: 'app-complementos-list',
  templateUrl: './complementos-list.component.html',
  styleUrls: ['./complementos-list.component.css']
})
export class ComplementosListComponent implements OnInit {
  complementos: any[] = []; // Lista de complementos
  errorMessage: string = ''; // Mensaje de error en caso de fallo

  constructor(
    private complementoService: ComplementoService,
    private carritoService : CarritoService
  ) {}

  ngOnInit(): void {
    // Obtener los complementos cuando se inicia el componente
    this.complementoService.getComplementos().subscribe(
      (response) => {
        if (response.data) {
          this.complementos = response.data;
        } else {
          this.complementos = response;
        }
      },
      (error) => {
        console.error('Error al obtener los complementos:', error);
        this.errorMessage = 'No se pudieron cargar los complementos. Inténtalo de nuevo más tarde.';
      }
    );
  }

  // Método para agregar complementos al carrito (aquí solo registramos el evento)
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

