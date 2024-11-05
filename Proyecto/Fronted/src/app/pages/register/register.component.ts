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
      email: ['', Validators.required],
      password: ['', [Validators.required]],
      confpassword: ['', Validators.required],
      idRol: ['2', Validators.required],
      idPasarelaPago:['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }


  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confpassword')?.value
      ? null : { 'passwordMismatch': true };
  }

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
}
