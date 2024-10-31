import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articuloServices/articulo.service';
import { TipoArticuloService } from 'src/app/services/tipoArticuloServices/tipo-articulo.service';
import { Router } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';
import { EstadoService } from 'src/app/services/estado/estado.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  articulos: any[] = [];
  tiposArticulo: any[] = [];
  idUser: number = 0;
  shopBagItems: any[] = [];
  proveedores: any[] = [];
  estadoArticulos: any[] = [];
  
  constructor(private articuloService: ArticuloService, private tipoArticuloService: TipoArticuloService, private proveedorService: ProveedorService, private estadoService: EstadoService, private router: Router) {}

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

  getProveedor(id: number): string {
    if (this.proveedores[id]) {
      return this.proveedores[id].nombre;
    }

    this.proveedorService.getByID(id).subscribe(data => {
      this.proveedores[id] = data; 
    });
    return 'Cargando...';
  }

  getEstadoArticulo(id: number): string {
    if (this.estadoArticulos[id]) {
      return this.estadoArticulos[id].estado;
    }

    this.estadoService.getByID(id).subscribe(data => {
      this.estadoArticulos[id] = data; 
    });
    return 'Cargando...';
  }

  redirectToLogin() {
    localStorage.setItem('idUser', JSON.stringify(0));
    this.router.navigate(['/login']);
  }
//ELIMINAR ANTES LAS CATEGORÍAS, RECORDATORIO
  deleteArticulo(id:number) {
    this.articuloService.delete(id).subscribe(data => {
      this.articulos = data;
    });
  }

}
