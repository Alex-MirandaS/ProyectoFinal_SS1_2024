import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articuloServices/articulo.service';
import { ShopBagService } from 'src/app/services/shopBag/shop-bag.service';
import { TipoArticuloService } from 'src/app/services/tipoArticuloServices/tipo-articulo.service';
import { Router } from '@angular/router';
import { ReportesService } from 'src/app/services/reportes/reportes.service';
@Component({
  selector: 'app-shop-bag',
  templateUrl: './shop-bag.component.html',
  styleUrls: ['./shop-bag.component.css']
})
export class ShopBagComponent implements OnInit {

  shopBag: any[] = [];
  tiposArticulo: any[] = [];
  articulos: any[] = [];
  idUser: number = 0;
  jwt: any = '';

  constructor(private shopBagService: ShopBagService, private tipoArticuloService: TipoArticuloService, private articuloService: ArticuloService, private pagarService: ReportesService, private router: Router) { }

  ngOnInit(): void {
    this.idUser = JSON.parse(localStorage.getItem('idUser') || '{}');
    this.jwt = JSON.parse(localStorage.getItem('jwt') || '{}');
    this.loadShopBag();
    this.loadTiposArticulo();
  }

  loadShopBag() {
    this.shopBagService.getByID(this.idUser).subscribe(
      (data) => {
        this.shopBag = data;
        this.loadArticulos();
      },
      (error) => {
        console.error('Error al obtener ShopBag:', error);
      }
    );
  }

  loadTiposArticulo() {
    this.tipoArticuloService.getAll().subscribe(
      (data) => {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          this.tiposArticulo[element.id] = element;
        }
      },
      (error) => {
        console.error('Error al obtener ShopBag:', error);
      }
    );
  }


  loadArticulos() {
    this.shopBag.forEach((shopBag) => {
      if (!this.articulos[shopBag.idArticulo]) {
        this.articuloService.getByID(shopBag.idArticulo).subscribe(
          (articulo) => {
            this.articulos[shopBag.idArticulo] = articulo;
          },
          (error) => {
            console.error(`Error al obtener el artículo ${shopBag.idArticulo}:`, error);
          }
        );
      }
    });
  }

  redirectToLogin() {
    localStorage.setItem('idUser', JSON.stringify(0));
    localStorage.setItem('idPasarelaPago', JSON.stringify(0));
    localStorage.setItem('jwt', JSON.stringify(''));
    this.router.navigate(['/login']);
  }

  loginPasarela() {
    let jwt = JSON.parse(localStorage.getItem('jwt') || '""');
    if (jwt != '') {
      let dataPago = {
        idUsuario: JSON.parse(localStorage.getItem('idUser') || '""'),
        jwt: jwt
      };

      this.pagarService.pagarGetComprobante(dataPago).subscribe(response => {

        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'comprobante.pdf'; // Nombre del archivo
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url); // Limpia el objeto URL
        
      });
    } else {
      this.router.navigate(['/loginPasarela']);
    }
  }

}
