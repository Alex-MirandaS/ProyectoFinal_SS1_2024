import { Component } from '@angular/core';
import { ArticuloService } from 'src/app/services/articuloServices/articulo.service';
import { TipoArticuloService } from 'src/app/services/tipoArticuloServices/tipo-articulo.service';
import { Router } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';
import { EstadoService } from 'src/app/services/estado/estado.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {

  reportes: any[] = [
    {id:1, titulo:'Registro Existencias', descripcion:'Reporte de Existencia de Productos' },
    {id:2, titulo:'Registro Usuarios', descripcion: 'Reporte de Usuarios inscritos al sitio'},
    {id:3, titulo:'Productos Vendidos', descripcion: 'Reporte de Productos Vendidos según: Nombre, Categoría y Proveedor'},
    {id:4, titulo:'Mayores Ventas', descripcion: 'Reporte de Productos Mayormente Vendidos (Ventas Mayores al Promedio de Ventas General)'},
    {id:5, titulo:'General Ventas', descripcion: 'Reporte de Compras no Terminadas'},
    {id:6, titulo:'Reporte Errores', descripcion: 'Reporte del Saldo Total de Ventas'},
    {id:7, titulo:'Reporte de Empleados', descripcion: 'Reporte de empleados/colaboradores'}
  ];
  idUser: number = 0;
  
  constructor( private router: Router) {}

  ngOnInit(): void {
    this.idUser = JSON.parse(localStorage.getItem('idUser') || '{}');
  }

  redirectToLogin() {
    localStorage.setItem('idUser', JSON.stringify(0));
    this.router.navigate(['/login']);
  }
  viewReporte(id:number, titulo:string) {
    localStorage.setItem('idReporte', JSON.stringify({id,titulo}));
    this.router.navigate(['/reporteView']);
  }
}
