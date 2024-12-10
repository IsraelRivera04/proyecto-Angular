import { Component } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    this.apiService.login(this.email, this.password).subscribe(
      (response) => {
        // Aquí agregamos el console.log
        console.log('Login exitoso:', response); // Imprimir la respuesta del backend
        
        localStorage.setItem('token', response.token); // Guardar el token en el almacenamiento local
        this.router.navigate(['/juegos']); // Redirigir a la página principal
      },
      (error) => {
        console.error('Error en login:', error); // Imprimir cualquier error en consola
        this.errorMessage = 'Credenciales inválidas'; // Mostrar mensaje de error
      }
    );
  }
}



