import { Component, OnInit } from '@angular/core';
import { SegundaManoService } from '.././servicios/segundamano.service';
import { CarritoService } from '../servicios/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-segunda-mano-list',
  templateUrl: './segunda-mano-list.component.html',
  styleUrls: ['./segunda-mano-list.component.css']
})
export class SegundaManoListComponent implements OnInit {
  juegos: any[] = [];
  errorMessage = ''; 

  constructor(
    private segundaManoService: SegundaManoService,
    private router: Router,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.segundaManoService.getJuegosSegundaMano().subscribe(
      (response) => {
        if (response.data) {
          this.juegos = response.data;
        } else {
          this.juegos = response; 
        }
        console.log('Juegos obtenidos:', this.juegos); 
      },
      (error) => {
        console.error('Error al obtener los juegos:', error);
        this.errorMessage = 'No se pudieron cargar los juegos. Inténtalo de nuevo más tarde.';
      }
    );
  }
  
  agregarAlCarrito(segundaMano: any): void {
      const cantidad = 1; 
      this.carritoService.agregarSegundaManoAlCarrito(segundaMano.id, cantidad).subscribe(
        (response) => {
          console.log('Juego de segunda mano añadido al carrito:', response);
        },
        (error) => {
          console.error('Error al añadir el juego de segunda mano al carrito:', error);
          this.errorMessage = 'No se pudo agregar el juego de segunda mano al carrito. Inténtalo de nuevo más tarde.';
        }
      );
    }

  verDetalle(id: number): void {
    this.router.navigate(['/segunda-mano', id]);
  }
}
