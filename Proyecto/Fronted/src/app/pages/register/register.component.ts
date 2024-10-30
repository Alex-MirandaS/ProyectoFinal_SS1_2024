import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,private router: Router) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confpassword: ['', Validators.required],
      idRol: ['2', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }


  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confpassword')?.value
      ? null : { 'passwordMismatch': true };
  }
/*
  pagosPasarelaValidator() {
//logica de la confirmación de cuenta en la pasarela de pagos.
  }*/

  onSubmit() {
    if (this.registerForm.valid) {
      this.usuarioService.add(this.registerForm.value).subscribe(response => {
        alert('Usuario registrado correctamente');
        this.router.navigate(['/login']);
        console.log('Registro exitoso', response);
      });
    }
  }
}
