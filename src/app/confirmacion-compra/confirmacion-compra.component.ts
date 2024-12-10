import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompraService } from '.././compra.service';

@Component({
  selector: 'app-confirmacion-compra',
  templateUrl: './confirmacion-compra.component.html',
  styleUrls: ['./confirmacion-compra.component.css']
})
export class ConfirmacionCompraComponent implements OnInit {
  pedido: any;

  constructor(
    private route: ActivatedRoute,
    private compraService: CompraService
  ) {}

  ngOnInit(): void {
    const pedidoId = this.route.snapshot.params['id'];
    this.compraService.obtenerConfirmacion(pedidoId).subscribe(
      (response) => {
        this.pedido = response.pedido;
        console.log(this.pedido);
      },
      (error) => {
        console.error('Error al obtener los detalles de la compra:', error);
      }
    );
  }

  descargarPDF(): void {
    const pedidoId = this.route.snapshot.params['id'];
    this.compraService.descargarPDF(pedidoId);
  }
}


