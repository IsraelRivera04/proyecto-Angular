import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Importar plugins de FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-eventos-list',
  templateUrl: './eventos-list.component.html',
  styleUrls: ['./eventos-list.component.css']
})
export class EventosListComponent implements OnInit {
  eventos: any[] = [];
  vista: string = 'lista';  // Vista predeterminada es 'lista'
  cargando: boolean = true;

  // Configuración del calendario
  calendarOptions: any = {
    plugins: [dayGridPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [],
    eventClick: (info: any) => this.verDetalleEvento(info)  // Al hacer clic en un evento
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.cargando = true;
    this.http.get('http://laravel.lo/api/eventos').subscribe(
      (response: any) => {
        this.eventos = response.data.map((evento: any) => ({
          id: evento.id,
          title: evento.nombre,
          description: evento.descripcion,
          fecha: evento.fecha,
          start: evento.fecha + 'T' + evento.hora_inicio, // Combina fecha y hora de inicio
          end: evento.fecha + 'T' + evento.hora_final,   // Combina fecha y hora de finalización
          imagen: evento.imagen || 'https://via.placeholder.com/150', // Imagen por defecto si no existe
        }));

        console.log(this.eventos);  // Ver los eventos en la consola

        // Asignamos los eventos al calendario
        this.calendarOptions.events = this.eventos;
        this.cargando = false;
      },
      (error) => {
        console.error('Error al cargar los eventos', error);
        this.cargando = false;
      }
    );
  }

  // Ver detalles del evento al hacer clic en el calendario
  verDetalleEvento(info: any): void {
    const eventoId = info.event.id; // Obtener el ID del evento
    if (eventoId) {
      this.router.navigate(['/eventos', eventoId]); // Redirigir al detalle del evento
    }
  }

  // Cambiar entre las vistas de 'lista' y 'calendario'
  cambiarVista(vista: string): void {
    this.vista = vista;
  }
}
