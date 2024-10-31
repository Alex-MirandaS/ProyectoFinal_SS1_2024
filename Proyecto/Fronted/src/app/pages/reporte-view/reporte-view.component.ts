import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportesService } from 'src/app/services/reportes/reportes.service';
@Component({
  selector: 'app-reporte-view',
  templateUrl: './reporte-view.component.html',
  styleUrls: ['./reporte-view.component.css']
})
export class ReporteViewComponent {

  objects: any[] = [];
  idUser: number = 0;
  reporteName: string = '';
  constructor(private reportesService: ReportesService, private router: Router) { }

  ngOnInit(): void {
    this.idUser = JSON.parse(localStorage.getItem('idUser') || '{}');
    this.loadObjects();
  }

  loadObjects() {
    const detailReporte = JSON.parse(localStorage.getItem('idReporte') || '{}');
    this.reporteName = detailReporte.titulo;
    this.reportesService.getReporte(detailReporte.id).subscribe(
      (data) => {
        this.objects = data;
      },
      (error) => {
        console.error('Error al obtener valores del Reporte:', error);
      }
    );
  }

    getColumns(): string[] {
      const columns = new Set<string>();
      this.objects.forEach((obj) => {
        Object.keys(obj).forEach((key) => columns.add(key));
      });
      return Array.from(columns);
    }

  redirectToLogin() {
    localStorage.setItem('idUser', JSON.stringify(0));
    this.router.navigate(['/login']);
  }

}
