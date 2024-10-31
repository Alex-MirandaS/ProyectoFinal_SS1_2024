import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportesService } from 'src/app/services/reportes/reportes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-pasarela',
  templateUrl: './login-pasarela.component.html',
  styleUrls: ['./login-pasarela.component.css']
})
export class LoginPasarelaComponent implements OnInit {
  form!: FormGroup;
  shopBagItems: any[] = [];
  idUser:any = '';  
  idPasarelaPago:any = '';
  constructor(private fb: FormBuilder, private loginPasServicio: ReportesService, private router: Router) { }

  ngOnInit(): void {
    this.idUser = JSON.parse(localStorage.getItem('idUser') || '""');
    this.idPasarelaPago = JSON.parse(localStorage.getItem('idPasarelaPago') || '""');
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      idPasarelaPago: [this.idPasarelaPago, Validators.required]
    });

  }

  onSubmit() {
    if (this.form.valid) {
      this.loginPasServicio.loginPasarela(this.form.value).subscribe(response => {
        localStorage.setItem('jwt', JSON.stringify(response));
        console.log(response);
      });
    }
  }

  redirectToLogin() {
    localStorage.setItem('idUser', JSON.stringify(0));
    localStorage.setItem('idPasarelaPago', JSON.stringify(0));
    localStorage.setItem('jwt', JSON.stringify(''));
    this.router.navigate(['/login']);
  }

}
