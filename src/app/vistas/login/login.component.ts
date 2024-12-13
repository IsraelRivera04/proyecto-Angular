import { Component } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    this.apiService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Login exitoso:', response);
        
        localStorage.setItem('token', response.token); 
        this.router.navigate(['/juegos']);
      },
      (error) => {
        console.error('Error en login:', error); 
        console.log(this.username, this.password);
        this.errorMessage = 'Credenciales inválidas'; 
      }
    );
  }
}



