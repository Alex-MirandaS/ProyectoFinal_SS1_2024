import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticuloService } from 'src/app/services/articuloServices/articulo.service';
import { EstadoService } from 'src/app/services/estado/estado.service';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';
import { TipoArticuloService } from 'src/app/services/tipoArticuloServices/tipo-articulo.service';

@Component({
  selector: 'app-manejo-productos',
  templateUrl: './manejo-productos.component.html',
  styleUrls: ['./manejo-productos.component.css']
})
export class ManejoProductosComponent implements OnInit{
  form!:FormGroup;
  estados: any[] = [];
  tiposArticulo: any[] = [];
  proveedores: any[] = [];

  constructor(private fb: FormBuilder, private estadoService: EstadoService, private tipoArticuloService: TipoArticuloService, private proveedorService: ProveedorService, private articuloService: ArticuloService) {}

  ngOnInit(): void {
    this.loadEstados();
    this.loadTiposArticulo();
    this.loadProveedores();

    this.form = this.fb.group({
      titulo: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: ['', Validators.required],
      descripcion: ['', Validators.required],
      idEstado: ['', Validators.required],
      idTipoArticulo: ['', Validators.required],
      idUsuario: [JSON.parse(localStorage.getItem('idUser') || '{}'), Validators.required],
      idProveedor: ['', Validators.required],
    });

    this.form.get('tipoArticulo')?.valueChanges.subscribe((value) => {
      console.log(value);
      if (value === 2) { 
        this.form.get('estado')?.disable();
      } else {
        this.form.get('estado')?.enable();
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.articuloService.add(this.form.value).subscribe(response => {
        alert('Artículo registrado correctamente');
      });
    }
  }

  loadEstados() {
    this.estadoService.getAll().subscribe(data => {
      this.estados = data;
    });
  }

  loadTiposArticulo(){
    this.tipoArticuloService.getAll().subscribe(data => {
      this.tiposArticulo = data;
    });
  }

  loadProveedores(){
    this.proveedorService.getAll().subscribe(data => {
      this.proveedores = data;
    });
  }
}
