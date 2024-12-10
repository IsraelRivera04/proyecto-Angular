
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SegundaManoService } from '../servicios/segundamano.service';

@Component({
  selector: 'app-segunda-mano-detail',
  templateUrl: './segunda-mano-detail.component.html',
  styleUrls: ['./segunda-mano-detail.component.css'],
})
export class SegundaManoDetailComponent implements OnInit {
  segundaManoJuego: any = null; // Contendrá los datos del juego
  complementos: any[] = [];
  errorMessage = '';

  constructor(
    private segundaManoService: SegundaManoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la URL
    if (id) {
      this.segundaManoService.getJuegoById(id).subscribe(
        (response) => {
          this.segundaManoJuego = response.segundaManoJuego; // Asigna los datos del juego
          this.complementos = response.complementos; // Asigna los complementos
          console.log('Detalles del juego:', this.segundaManoJuego);
          console.log('Complementos:', this.complementos);
        },
        (error) => {
          console.error('Error al obtener el juego:', error);
          this.errorMessage =
            'No se pudo cargar la información del juego. Inténtalo más tarde.';
        }
      );
    }
  }
  agregarAlCarrito(juego: any): void {
    if (juego.stock > 0) {
      juego.stock = 0; 
      console.log(`Juego "${juego.nombre}" añadido al carrito.`);
    }
  }
}





