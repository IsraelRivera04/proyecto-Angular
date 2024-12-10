import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eventos-detail',
  templateUrl: './eventos-detail.component.html',
  styleUrls: ['./eventos-detail.component.css']
})
export class EventosDetailComponent implements OnInit {
  evento: any = null; 
  participantes: any[] = []; 
  cargando: boolean = true; 
  mensaje: string = ''; 
  tipoMensaje: string = ''; 
  private apiUrl = 'http://laravel.lo/api'; 

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const eventoId = this.route.snapshot.paramMap.get('id'); 
    if (eventoId) {
      this.cargarEvento(eventoId);
      this.cargarParticipantes(eventoId);
    }
  }

  cargarEvento(eventoId: string): void {
    this.http.get(`${this.apiUrl}/eventos/${eventoId}`).subscribe({
      next: (response: any) => {
        this.evento = response.data || response; 
        this.cargando = false;
        console.log('Evento cargado:', this.evento);
      },
      error: (error) => {
        console.error('Error al cargar el evento:', error);
        this.cargando = false;
        this.mostrarMensaje('Error al cargar el evento.', 'error');
      }
    });
  }

  cargarParticipantes(eventoId: string): void {
    this.http.get(`${this.apiUrl}/eventos/${eventoId}/participantes`).subscribe(
      (response: any) => {
        this.participantes = response;
      },
      (error) => {
        console.error('Error al cargar los participantes', error);
      }
    );
  }  
  
  inscribirse(eventoId: any): void {
    const eventoIdStr = eventoId.toString(); 
    this.http.post(`${this.apiUrl}/eventos/${eventoIdStr}/inscribirse`, {}).subscribe(
      (response) => {
        console.log('Inscripción exitosa', response);
        this.mostrarMensaje('Inscripción realizada correctamente.', 'success');
        this.cargarParticipantes(eventoIdStr); // Recargar los participantes después de la inscripción
      },
      (error) => {
        console.error('Error al inscribirse:', error);
        this.mostrarMensaje('Error al inscribirse. Intenta nuevamente.', 'error');
      }
    );
  }
  
  mostrarMensaje(mensaje: string, tipo: string): void {
    this.mensaje = mensaje;
    this.tipoMensaje = tipo;
    setTimeout(() => {
      this.mensaje = '';
      this.tipoMensaje = '';
    }, 5000); // Ocultar el mensaje después de 5 segundos
  }
}
