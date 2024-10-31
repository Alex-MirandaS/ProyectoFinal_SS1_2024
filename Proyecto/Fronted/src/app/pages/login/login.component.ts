import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  user: any;
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) { }
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  registrarse() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.usuarioService.login(this.loginForm.value).subscribe(
        response => {
          let userId = response.user.id;
          let pasarelaPagoId = response.user.idPasarelaPago;
          localStorage.setItem('idUser', JSON.stringify(userId));
          localStorage.setItem('idPasarelaPago', JSON.stringify(pasarelaPagoId));
          this.usuarioService.getByID(userId).subscribe(
            userInfo => {
              const user: any = userInfo;
              if (user.idRol == 1) {
                this.router.navigate(['/admin']);
              } else {
                this.router.navigate(['/']);
              }
            },
            error => {
              console.error('Error al obtener la información del usuario:', error);
            }
          );
          
        },
        error => {
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  getUser(id: number) {
    this.usuarioService.getByID(id).subscribe(
      response => {
        return response;
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }
}
