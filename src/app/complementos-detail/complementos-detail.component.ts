import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from '../servicios/carrito.service';
import { ComplementoService } from '../servicios/complemento.service';

@Component({
  selector: 'app-complementos-detail',
  templateUrl: './complementos-detail.component.html',
  styleUrls: ['./complementos-detail.component.css']
})
export class ComplementosDetailComponent implements OnInit {
  complemento: any;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute, 
    private complementoService: ComplementoService,
    private carritoService : CarritoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.complementoService.getComplementoById(id).subscribe(
        (data) => {
          this.complemento = data; // Asignar los datos del juego
        },
        (error) => {
          console.error('Error al obtener el complemento:', error);
        }
      );
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
