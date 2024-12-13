import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from '../servicios/eventos.service';

@Component({
  selector: 'app-eventos-detail',
  templateUrl: './eventos-detail.component.html',
  styleUrls: ['./eventos-detail.component.css']
})
export class EventosDetailComponent implements OnInit {
  evento: any;
  participantes: any[] = [];
  cargando: boolean = true;
  mensaje: string = '';
  tipoMensaje: string = '';

  constructor(
    private route: ActivatedRoute,
    private eventosService: EventosService
  ) {}

  ngOnInit(): void {
    const eventoId = this.route.snapshot.paramMap.get('id');
    if (eventoId) {
      this.cargarEvento(eventoId);
      this.cargarParticipantes(eventoId);
    }
  }

  cargarEvento(eventoId: string): void {
    this.eventosService.obtenerDetallesEvento(+eventoId).subscribe({
      next: (response: any) => {
        this.evento = response.data || response;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar el evento:', error);
        this.cargando = false;
        this.mostrarMensaje('Error al cargar el evento.', 'error');
      }
    });
  }

  cargarParticipantes(eventoId: string): void {
    this.eventosService.obtenerParticipantes(eventoId).subscribe({
      next: (response: any) => {
        this.participantes = response;
      },
      error: (error) => {
        console.error('Error al cargar los participantes:', error);
      }
    });
  }

  inscribirse(): void {
    const eventoId = this.route.snapshot.paramMap.get('id');
    if (!eventoId) {
      this.mostrarMensaje('No se encontró el ID del evento.', 'error');
      return;
    }

    this.eventosService.inscribirse(eventoId).subscribe({
      next: () => {
        this.mostrarMensaje('¡Te has inscrito correctamente al evento!', 'success');
        this.cargarParticipantes(eventoId); // Actualiza la lista de participantes
      },
      error: (error) => {
        console.error('Error al inscribirse:', error);
        this.mostrarMensaje('Ya estás inscrito al evento.', 'error');
      }
    });
  }

  mostrarMensaje(mensaje: string, tipo: string): void {
    this.mensaje = mensaje;
    this.tipoMensaje = tipo;
    setTimeout(() => {
      this.mensaje = '';
      this.tipoMensaje = '';
    }, 5000);
  }
}


