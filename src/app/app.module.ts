import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.service';
import { JuegosListComponent } from './components/juegos-list/juegos-list.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';
import { JuegoDetailComponent } from './components/juego-detail/juego-detail.component';
import { ComplementosListComponent } from './complementos-list/complementos-list.component';
import { ComplementosDetailComponent } from './complementos-detail/complementos-detail.component';
import { EventosListComponent } from './components/eventos-list/eventos-list.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EventosDetailComponent } from './eventos-detail/eventos-detail.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { SegundaManoListComponent } from './segunda-mano-list/segunda-mano-list.component';
import { SegundaManoDetailComponent } from './segunda-mano-detail/segunda-mano-detail.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CompraFinalizarComponent } from './compra-finalizar/compra-finalizar.component';
import { ConfirmacionCompraComponent } from './confirmacion-compra/confirmacion-compra.component';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    routingComponents,
    JuegosListComponent,
    JuegoDetailComponent,
    ComplementosListComponent,
    ComplementosDetailComponent,
    EventosListComponent,
    CuentaComponent,
    EventosDetailComponent,
    RegistroComponent,
    HomeComponent,
    SegundaManoListComponent,
    SegundaManoDetailComponent,
    CarritoComponent,
    CompraFinalizarComponent,
    ConfirmacionCompraComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule,
    FullCalendarModule,
    CommonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'es',
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }

