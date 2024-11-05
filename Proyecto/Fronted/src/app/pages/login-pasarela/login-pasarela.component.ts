import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportesService } from 'src/app/services/reportes/reportes.service';
import { ShopBagService } from 'src/app/services/shopBag/shop-bag.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-pasarela',
  templateUrl: './login-pasarela.component.html',
  styleUrls: ['./login-pasarela.component.css']
})
export class LoginPasarelaComponent implements OnInit {
  form!: FormGroup;
  shopBagItems: any[] = [];
  idPasarelaPagos: any;

  constructor(private fb: FormBuilder, private pagarService: ReportesService, private router: Router, private shopBagService: ShopBagService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getIdPasarelaPago();
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
/*
  onSubmit() {
    if (this.registerForm.valid) {
      this.usuarioService.add(this.registerForm.value).subscribe(response => {
        alert('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      },
      error => {
        alert(error.error.message || 'Error desconocido. Inténtalo de nuevo.');
        console.error('Error al registrar el usuario', error);
        this.router.navigate(['/register']);
      }
    );
    } 
  }
*/
  onSubmit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      let dataLogin = {
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
        idPasarelaPago: this.idPasarelaPagos
      }
      this.pagarService.loginPasarela(dataLogin).subscribe(response => {
        //Guardamos el jwt
        localStorage.setItem('jwt', JSON.stringify(response));
        //Se intenta realizar la compra
        //Se define la data a utilizar
        let dataPago = {
          idUsuario: JSON.parse(localStorage.getItem('idUser') || '""'),
          jwt: JSON.parse(localStorage.getItem('jwt') || '""')
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
          
          this.router.navigate(['/ordenes']);
        });
      },
      error => {
        alert(error.error.message || 'Error desconocido. Inténtalo de nuevo.');
        console.error('Error al registrar el usuario', error);
        this.router.navigate(['/loginPasarela']);
      });
    }
  }

  redirectToLogin() {
    localStorage.setItem('idUser', JSON.stringify(0));
    localStorage.setItem('idPasarelaPago', JSON.stringify(0));
    localStorage.setItem('jwt', JSON.stringify(''));
    this.router.navigate(['/login']);
  }

  getIdPasarelaPago() {
    this.usuarioService.getIdPasarelaPagobyId(JSON.parse(localStorage.getItem('idUser') || '""')).subscribe(
      response => {
        this.idPasarelaPagos = response[0]?.idPasarelaPago;
      }
    )
  }
}
