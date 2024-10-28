import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../services/ArticuloService';
import { Articulo } from '../../models/ArticuloModel';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
addToCart(_t2: any) {
throw new Error('Method not implemented.');
}
  products: Articulo[] = [];

  constructor(private articuloService: ArticuloService) {}

  ngOnInit() {
    this.articuloService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
