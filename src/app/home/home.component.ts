import { Component, OnInit } from '@angular/core';
import { HomeService } from '../servicios/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  juegosDestacados: any[] = [];
  complementosPopulares: any[] = [];
  proximosEventos: any[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.homeService.obtenerJuegosDestacados().subscribe(
      (data) => (this.juegosDestacados = data),
      (error) => console.error('Error al cargar juegos destacados:', error)
    );

    this.homeService.obtenerComplementosPopulares().subscribe(
      (data) => (this.complementosPopulares = data),
      (error) => console.error('Error al cargar complementos populares:', error)
    );

    this.homeService.obtenerProximosEventos().subscribe(
      (data) => (this.proximosEventos = data),
      (error) => console.error('Error al cargar próximos eventos:', error)
    );
  }
}
