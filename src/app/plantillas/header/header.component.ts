import { Component } from '@angular/core';
import { JuegoService } from '../../servicios/juego.service';
import { JuegosListComponent } from '../../components/juegos-list/juegos-list.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor(private juegoService: JuegoService) {}
}


