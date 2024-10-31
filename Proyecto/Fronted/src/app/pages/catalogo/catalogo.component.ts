import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articuloServices/articulo.service';
import { TipoArticuloService } from 'src/app/services/tipoArticuloServices/tipo-articulo.service';
import { ShopBagService } from 'src/app/services/shopBag/shop-bag.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit{

  articulos: any[] = [];
  tiposArticulo: any[] = [];
  idUser: number = 0;
  shopBagItems: any[] = [];

  constructor(private articuloService: ArticuloService, private tipoArticuloService: TipoArticuloService, private shopBagService: ShopBagService, private router: Router) {}

  ngOnInit(): void {
    this.loadArticulos();
    this.loadTiposArticulo();
    this.getShopBagSize();
    this.idUser = JSON.parse(localStorage.getItem('idUser') || '{}');
  }

  loadArticulos() {
    this.articuloService.getAll().subscribe(data => {
      this.articulos = data;
    });
  }

  loadTiposArticulo(){
    this.tipoArticuloService.getAll().subscribe(data => {
      this.tiposArticulo = data;
    });
  }


  getTipoArticulo(id: number): string {
    if (this.tiposArticulo[id]) {
      return this.tiposArticulo[id].titulo;
    }

    this.tipoArticuloService.getByID(id).subscribe(data => {
      this.tiposArticulo[id] = data; 
    });
    return 'Cargando...';
  }

  addShopBag(idArticulo: number) {
    let data = {
      idUsuario: this.idUser,
      idArticulo: idArticulo,
      cantidad: 1,
      seleccionado: false,
    };
    console.log(data);
    this.shopBagService.add(data).subscribe(
      (response) => {
        console.log('Artículo agregado a la cesta:', response);
        alert('Artículo agregado a la cesta correctamente');
      },
      (error) => {
        console.error('Error al agregar artículo a la cesta:', error);
      }
    );
  }

  getShopBagSize() {
    this.shopBagService.getByID(this.idUser).subscribe(
      (data) => {
        this.shopBagItems = data;
      },
      (error) => {
        console.error('Error al obtener ShopBag:', error);
      }
    );
  }

  redirectToLogin() {
    localStorage.setItem('idUser', JSON.stringify(0));
    localStorage.setItem('idPasarelaPago', JSON.stringify(0));
    localStorage.setItem('jwt', JSON.stringify(''));
    this.router.navigate(['/login']);
  }

}
