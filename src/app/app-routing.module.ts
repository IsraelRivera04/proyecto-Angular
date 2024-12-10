import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { NuevoComponent } from './vistas/nuevo/nuevo.component';
import { EditarComponent } from './vistas/editar/editar.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { JuegosListComponent } from './components/juegos-list/juegos-list.component';
import { JuegoDetailComponent } from './components/juego-detail/juego-detail.component';
import { ComplementosListComponent } from './complementos-list/complementos-list.component';
import { ComplementosDetailComponent } from './complementos-detail/complementos-detail.component';
import { EventosListComponent } from './components/eventos-list/eventos-list.component';
import { EventosDetailComponent } from './eventos-detail/eventos-detail.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { SegundaManoListComponent } from './segunda-mano-list/segunda-mano-list.component';
import { SegundaManoDetailComponent } from './segunda-mano-detail/segunda-mano-detail.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CompraFinalizarComponent } from './compra-finalizar/compra-finalizar.component';
import { ConfirmacionCompraComponent } from './confirmacion-compra/confirmacion-compra.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'juegos', component: JuegosListComponent},
  { path: 'juegos/:id', component: JuegoDetailComponent },
  { path: 'login', component: LoginComponent},
  { path: 'nuevo', component: NuevoComponent},
  { path: 'editar', component: EditarComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'complementos', component: ComplementosListComponent },
  { path: 'complementos/:id', component: ComplementosDetailComponent },
  { path: 'eventos', component: EventosListComponent },
  { path: 'eventos/:id', component: EventosDetailComponent },
  { path: 'micuenta', component: CuentaComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'home', component: HomeComponent},
  { path: 'segunda-mano', component: SegundaManoListComponent },
  { path: 'segunda-mano/:id', component: SegundaManoDetailComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'compra-finalizar', component: CompraFinalizarComponent },
  { path: 'compra/confirmacion/:id', component: ConfirmacionCompraComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ LoginComponent, NuevoComponent, EditarComponent, DashboardComponent ]
