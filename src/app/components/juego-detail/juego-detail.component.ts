import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { JuegoService } from '../../servicios/juego.service';
import { ComentariosService } from '../../comentarios.service';

@Component({
  selector: 'app-juego-detail',
  templateUrl: './juego-detail.component.html',
  styleUrls: ['./juego-detail.component.css']
})
export class JuegoDetailComponent implements OnInit {
  juego: any;
  complementos: any[] = [];
  comentarios: any[] = [];
  comentarioForm: FormGroup;
  isLoggedIn: boolean = false;
  errorMessage: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private juegoService: JuegoService,
    private carritoService: CarritoService,
    private fb: FormBuilder,
    private comentariosService: ComentariosService
  ) {
    this.comentarioForm = this.fb.group({
      comentario: ['', [Validators.required, Validators.maxLength(1000)]],
      valoracion: ['', [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.juegoService.getJuegoById(id).subscribe(
        (response) => {
          this.juego = response.juego;
          this.complementos = response.complementos;
          this.obtenerComentarios(this.juego.id);
        },
        (error) => {
          console.error('Error al obtener el juego:', error);
        }
      );
    }
  
    this.isLoggedIn = !!localStorage.getItem('token');
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

  enviarComentario(): void {
    if (this.comentarioForm.valid) {
      this.comentariosService.agregarComentario(this.juego.id, this.comentarioForm.value).subscribe({
        next: () => {
          alert('Comentario enviado con éxito');
          this.juegoService.getJuegoById(this.juego.id).subscribe(data => {
            this.juego = data;
          });
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Ocurrió un error';
        }
      });
    }
  }

  obtenerComentarios(juegoId: number): void { 
    this.comentariosService.obtenerComentarios(juegoId).subscribe( 
      (data) => { 
        this.comentarios = data; 
        console.log(this.comentarios);
      }, 
      (error) => { 
        console.error('Error al obtener los comentarios:', error); 
      } ); 
    }

}


