import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articuloServices/articulo.service';
import { ShopBagService } from 'src/app/services/shopBag/shop-bag.service';
import { OrdenService } from 'src/app/services/orden/orden.service';
import { EstadoOrdenService } from 'src/app/services/estadoOrden/estado-orden.service';
import { Router } from '@angular/router';
import { ReportesService } from 'src/app/services/reportes/reportes.service';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit{

  shopBag: any[] = [];
  ordenes: any[] = [];
  estadoOrden: any[] = [];
  constructor(private shopBagService: ShopBagService, private ordenService: OrdenService, private estadoOrdenService: EstadoOrdenService, private router: Router) { }

  ngOnInit(): void {
    this.loadShopBag();
    this.loadOrdenes();
  }

  loadShopBag() {
    this.shopBagService.getByID(JSON.parse(localStorage.getItem('idUser') || '{}')).subscribe(
      (data) => {
        this.shopBag = data;
      },
      (error) => {
        console.error('Error al obtener ShopBag:', error);
      }
    );
  }

  loadOrdenes() {
    this.ordenService.getOrdenByIdUsuario(JSON.parse(localStorage.getItem('idUser') || '{}')).subscribe(
      (data) => {
        console.log(data);
        this.ordenes = data;
      },
      (error) => {
        console.error('Error al obtener Ordenes:', error);
      }
    );
  }

  getFechaHora(esFecha: boolean,fecha:string):any {
    const fechaObjeto = new Date(fecha);
    if (esFecha) {
      return fechaObjeto.toISOString().split('T')[0];;
    }else{
      return fechaObjeto.toTimeString().split(' ')[0];
    }
  }

  getEstadoOrden(id: number): string {
    if (this.estadoOrden[id]) {
      return this.estadoOrden[id].estado;
    }

    this.estadoOrdenService.getByID(id).subscribe(data => {
      this.estadoOrden[id] = data; 
    });
    return 'Cargando...';
  }

  redirectToLogin() {
    localStorage.setItem('idUser', JSON.stringify(0));
    localStorage.setItem('jwt', JSON.stringify(''));
    this.router.navigate(['/login']);
  }

  verDetalleOrden(idOrden: number) {
    localStorage.setItem('idOrden', JSON.stringify(idOrden));
    this.router.navigate(['/detalleOrden']);
  }

}
