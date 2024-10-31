import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articuloServices/articulo.service';
import { TipoArticuloService } from 'src/app/services/tipoArticuloServices/tipo-articulo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  articulos: any[] = [];
  tiposArticulo: any[] = [];

  constructor(private articuloService: ArticuloService, private tipoArticuloService: TipoArticuloService,private router: Router) {}

  ngOnInit(): void {
    this.loadArticulos();
    this.loadTiposArticulo();
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
