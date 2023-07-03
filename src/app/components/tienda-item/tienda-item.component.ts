import {Component, Input, OnInit} from '@angular/core';
import {Tienda} from 'src/app/models/tienda.model';
import {Router} from "@angular/router";

@Component({
  selector: 'tienda-item',
  templateUrl: './tienda-item.component.html',
  styleUrls: ['./tienda-item.component.scss']
})
export class TiendaItemComponent implements OnInit {

  // @ts-ignore
  @Input() tienda: Tienda;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  seleccionaTienda() {
    this.router.navigate(
      ['/map'],
      {queryParams: {lat: this.tienda.direccion.ubicacion.latitud, lon:this.tienda.direccion.ubicacion.longitud}}
    );

  }
}
