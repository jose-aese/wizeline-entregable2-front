import {DOCUMENT} from '@angular/common';
import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {TiendasService} from 'src/app/services/tienda/tiendas.service';

import {environment} from 'src/environments/environment';
import {Spiner} from "../../services/spiner.service";
import {Tienda} from "../../models/tienda.model";


@Component({
  selector: 'list-tiendas',
  templateUrl: './list-tiendas.component.html',
  styleUrls: ['./list-tiendas.component.scss']
})
export class ListTiendasComponent implements OnInit {

  public tiendas: Tienda[] = [];
  public showButton = false;
  private scrollHeight = 500;
  private paginaAux: string | null = null;
  private host = environment.hostImagenes;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(@Inject(DOCUMENT) private document: Document,
              private tiendasService: TiendasService,
              public spiner: Spiner,) {
  }

  ngOnInit(): void {
    this.tiendasService.tiendas().subscribe({
      next: (response) => {
        this.estructura(response.tiendas);
        if (response.paginaSiguiente) {
          localStorage.setItem('paginaSiguiente', response.paginaSiguiente);
        }
      },
      error: (e) => console.error(e),
      complete: () => this.spiner.close()
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  onScrollDown(): void {
    const paginaSiguiente = localStorage.getItem('paginaSiguiente');
    if (!paginaSiguiente) {
      return;
    }
    if (this.paginaAux === paginaSiguiente) {
      return;
    }

    this.paginaAux = paginaSiguiente;
    this.tiendasService.tiendasByPage(paginaSiguiente).subscribe({
      next: (response) => {
        this.estructura(response.tiendas);
        if (response.paginaSiguiente) {
          localStorage.setItem('paginaSiguiente', response.paginaSiguiente);
        }
      },
      error: (e) => console.error(e),
      complete: () => this.spiner.close()
    });


    /*

    const decript = {tiendas};
    await this.cypher.doFinal(tiendasFilter, decript, this.cypher.decrypt);
    this.tiendas = decript.tiendas;
    this.tiendas.forEach((tienda: Tienda) => {
      if (!tienda.logo || !tienda.logo.referencia) {
        tienda.host = null;
      } else {
        tienda.host = this.host + tienda.logo.referencia;
      }
      if (tienda.direccion) {
        tienda.localizacion = `${tienda.direccion.calle} ${tienda.direccion.numeroExterior}, ${tienda.direccion.colonia}, ${tienda.direccion.municipio}, ${tienda.direccion.codigoPostal}, ${tienda.direccion.entidadFederativa}`;
      } else {
        tienda.localizacion = '';
        tienda.zonasTrabajo.forEach((zona: any) => {
          tienda.localizacion = tienda.localizacion + ', ' + zona.nombre;
        });
        tienda.localizacion = tienda.localizacion.slice(2, tienda.localizacion.length)
      }
    });

     */
  }

  estructura(tiendas: []): void {
    tiendas.forEach((tienda: Tienda) => {
      if (!tienda.logo || !tienda.logo.referencia) {
        tienda.host = '';
      } else {
        tienda.host = this.host + tienda.logo.referencia;
      }
      if (tienda.direccion) {
        tienda.localizacion = `${tienda.direccion.calle} ${tienda.direccion.numeroExterior}, ${tienda.direccion.colonia}, ${tienda.direccion.municipio}, ${tienda.direccion.codigoPostal}, ${tienda.direccion.entidadFederativa}`;
      } else {
        tienda.localizacion = '';
        tienda.zonasTrabajo.forEach((zona: any) => {
          tienda.localizacion = tienda.localizacion + ', ' + zona.nombre;
        });
        tienda.localizacion = tienda.localizacion.slice(2, tienda.localizacion.length)
      }
      this.tiendas.push(tienda);
    });
  }

}
