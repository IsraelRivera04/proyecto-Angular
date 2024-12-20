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
  juegosFiltrados: any[] = [];
  errorMessage = '';
  searchTerm: string = '';
  isNombreOrdenado: boolean = false;
  isPrecioOrdenado: boolean = false;

  constructor(
    private juegoService: JuegoService,
    private router: Router,
    private carritoService: CarritoService,
  ) {}

  ngOnInit(): void {
    this.cargarJuegos();
  }

  cargarJuegos(orden: string = 'asc', tipo: string = 'nombre'): void {
    this.juegoService.getJuegos().subscribe(
      (response) => {
        if (response.data) {
          this.juegos = response.data;
        } else {
          this.juegos = response;
        }
        // Inicializamos juegosFiltrados con todos los juegos
        this.juegosFiltrados = [...this.juegos];

        // Si hay un tipo de orden, lo aplicamos
        if (tipo === 'nombre') {
          this.ordenarPorNombre(orden);
        } else if (tipo === 'precio') {
          this.ordenarPorPrecio(orden);
        }
        console.log('Juegos obtenidos:', this.juegos);
      },
      (error) => {
        console.error('Error al obtener los juegos:', error);
        this.errorMessage = 'No se pudieron cargar los juegos. Inténtalo de nuevo más tarde.';
      }
    );
  }

  ordenarPorNombre(orden: string): void {
    if (orden === 'asc') {
      this.juegosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else {
      this.juegosFiltrados.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }
  }

  ordenarPorPrecio(orden: string): void {
    this.juegosFiltrados.sort((a, b) => {
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
      this.cargarJuegos(orden, 'nombre');
    }
  }

  cambiarOrdenPrecio(event: any): void {
    const orden = event.target.value;
    if (orden) {
      this.isPrecioOrdenado = true;
      this.isNombreOrdenado = false;
      this.cargarJuegos(orden, 'precio');
    }
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

  filtrarJuegos(): void {
    if (this.searchTerm) {
      // Filtrar los juegos por nombre (comparación insensible a mayúsculas/minúsculas)
      this.juegosFiltrados = this.juegos.filter(juego =>
        juego.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      // Si no hay término de búsqueda, mostrar todos los juegos
      this.juegosFiltrados = [...this.juegos];  // Asegurarnos de que no se modifique directamente `juegos`
    }
  }
}


