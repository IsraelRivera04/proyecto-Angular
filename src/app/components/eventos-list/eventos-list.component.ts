import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-eventos-list',
  templateUrl: './eventos-list.component.html',
  styleUrls: ['./eventos-list.component.css']
})
export class EventosListComponent implements OnInit {
  eventos: any[] = [];
  vista: string = 'lista'; 
  cargando: boolean = true;
  calendarOptions: any = {
    plugins: [dayGridPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [],
    eventClick: (info: any) => this.verDetalleEvento(info)
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
          start: evento.fecha + 'T' + evento.hora_inicio, 
          end: evento.fecha + 'T' + evento.hora_final,  
          imagen: evento.imagen || 'https://via.placeholder.com/150',
        }));
        console.log(this.eventos); 

        this.calendarOptions.events = this.eventos;
        this.cargando = false;
      },
      (error) => {
        console.error('Error al cargar los eventos', error);
        this.cargando = false;
      }
    );
  }

  verDetalleEvento(info: any): void {
    const eventoId = info.event.id; 
    if (eventoId) {
      this.router.navigate(['/eventos', eventoId]);
    }
  }

  cambiarVista(vista: string): void {
    this.vista = vista;
  }
}
