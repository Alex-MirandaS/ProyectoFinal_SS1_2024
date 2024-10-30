import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  errorMessage: string = '';
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,private router: Router) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
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
          this.router.navigate(['/']);
          console.log(response.userId);
          localStorage.setItem('idUser', JSON.stringify(response.userId));
        },
        error => {
          this.errorMessage = error.error.message;
        }
      );
    }
  }
}
