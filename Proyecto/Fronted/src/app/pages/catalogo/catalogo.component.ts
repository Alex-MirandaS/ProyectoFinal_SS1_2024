import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articuloServices/articulo.service';
import { TipoArticuloService } from 'src/app/services/tipoArticuloServices/tipo-articulo.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit{

  articulos: any[] = [];
  tiposArticulo: any[] = [];
  idUser: number = 0;

  constructor(private articuloService: ArticuloService, private tipoArticuloService: TipoArticuloService) {}

  ngOnInit(): void {
    this.loadArticulos();
    this.loadTiposArticulo();
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

}
