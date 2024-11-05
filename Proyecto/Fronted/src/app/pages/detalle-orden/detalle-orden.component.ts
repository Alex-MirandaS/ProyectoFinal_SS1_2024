import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articuloServices/articulo.service';
import { ShopBagService } from 'src/app/services/shopBag/shop-bag.service';
import { DetalleOrdenService } from 'src/app/services/detalleOrden/detalle-orden.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { OrdenService } from 'src/app/services/orden/orden.service';
import { EstadoOrdenService } from 'src/app/services/estadoOrden/estado-orden.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-orden',
  templateUrl: './detalle-orden.component.html',
  styleUrls: ['./detalle-orden.component.css']
})
export class DetalleOrdenComponent implements OnInit {

  shopBag: any[] = [];
  articulosDetalle: any[] = [];
  estadoOrden: any;
  articulos: any[] = [];
  usuario: any;
  orden: any;

  constructor(private shopBagService: ShopBagService, private detalleOrdenService: DetalleOrdenService, private articuloService: ArticuloService, private usuarioService: UsuarioService, private ordenService: OrdenService, private estadoOrdenService: EstadoOrdenService, private router: Router) { }

  ngOnInit(): void {
    this.loadShopBag();
    this.loadDetalleOrden();
    this.getUsuario();
    this.getOrden();
    this.getEstadoOrden()
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

  loadDetalleOrden() {
    this.detalleOrdenService.getByID(JSON.parse(localStorage.getItem('idOrden') || '{}')).subscribe(
      (data) => {
        this.articulosDetalle = data;
        this.loadArticulos();
      },
      (error) => {
        console.error('Error al obtener ShopBag:', error);
      }
    );
  }

  loadArticulos() {
    this.articulosDetalle.forEach((articuloDetalle) => {
      if (!this.articulos[articuloDetalle.idProducto]) {
        this.articuloService.getByID(articuloDetalle.idProducto).subscribe(
          (articulo) => {
            this.articulos[articuloDetalle.idProducto] = articulo;
          },
          (error) => {
            console.error(`Error al obtener el artículo ${articuloDetalle.idProducto}:`, error);
          }
        );
      }
    });

  }

  getUsuario() {
    this.usuarioService.getByID(JSON.parse(localStorage.getItem('idUser') || '{}')).subscribe((data) => {
      this.usuario = data;
    },
      (error) => {
        console.error('Error al obtener Usuario:', error);
      })
  }

  getOrden() {
    this.ordenService.getByID(JSON.parse(localStorage.getItem('idOrden') || '{}')).subscribe((data) => {
      this.orden = data[0];
      this.getEstadoOrden();
    },
      (error) => {
        console.error('Error al obtener Orden:', error);
      })
  }

  getFechaHora(esFecha: boolean, fecha: string): any {
    const fechaObjeto = new Date(fecha);
    if (esFecha) {
      return fechaObjeto.toISOString().split('T')[0];;
    } else {
      return fechaObjeto.toTimeString().split(' ')[0];
    }
  }

  getEstadoOrden() {
    this.estadoOrdenService.getByID(this.orden.idEstadoOrden).subscribe(data => {
      this.estadoOrden = data;
    });
  }


  redirectToLogin() {
    localStorage.setItem('idUser', JSON.stringify(0));
    localStorage.setItem('idPasarelaPago', JSON.stringify(0));
    localStorage.setItem('jwt', JSON.stringify(''));
    this.router.navigate(['/login']);
  }

}
