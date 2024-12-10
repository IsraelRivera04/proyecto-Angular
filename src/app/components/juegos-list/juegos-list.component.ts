import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../servicios/juego.service';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-juegos-list',
  templateUrl: './juegos-list.component.html',
  styleUrls: ['./juegos-list.component.css']
})
export class JuegosListComponent implements OnInit {
  juegos: any[] = []; 
  errorMessage = ''; 

  constructor(
    private juegoService: JuegoService,
    private router: Router,
    private carritoService: CarritoService,
  ) {}

  ngOnInit(): void {
    this.juegoService.getJuegos().subscribe(
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

  agregarAlCarrito(juego: any): void {
    const cantidad = 1;
    this.carritoService.agregarJuegoAlCarrito(juego.id, cantidad).subscribe(
      (response) => {
        console.log('Juego añadido al carrito:', response);
      },
      (error) => {
        console.error('Error al añadir el juego al carrito:', error);
        this.errorMessage = 'No se pudo agregar el juego al carrito. Inténtalo de nuevo más tarde.';
      }
    );
  }
  


  verDetalle(id: number): void {
    this.router.navigate(['/juegos', id]);
  }
}

