import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  usuario: any = {}; // Datos del usuario logueado

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarioAutenticado();
  }

  // Método para cargar datos del usuario logueado
  cargarUsuarioAutenticado(): void {
    this.usuarioService.obtenerUsuarioAutenticado().subscribe(
      (data) => {
        this.usuario = data;
      },
      (error) => {
        console.error('Error al cargar los datos del usuario', error);
      }
    );
  }

  editarDatos() {
    console.log('Editar datos del usuario');
    // Aquí puedes redirigir al formulario de edición
  }

  cerrarSesion() {
    console.log('Cerrar sesión');
    localStorage.removeItem('token'); // Eliminar token al cerrar sesión
    // Navegar a la página de login o inicio
  }
}
