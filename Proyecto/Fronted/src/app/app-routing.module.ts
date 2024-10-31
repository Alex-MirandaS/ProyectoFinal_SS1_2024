import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ShopBagComponent } from './pages/shop-bag/shop-bag.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ManejoProductosComponent } from './pages/manejo-productos/manejo-productos.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { ReporteViewComponent } from './pages/reporte-view/reporte-view.component';
import { LoginPasarelaComponent } from './pages/login-pasarela/login-pasarela.component';

const routes: Routes = [
  { path: '', component: CatalogoComponent },
  { path: 'home', component: HomeComponent },
  { path: 'shopBag', component: ShopBagComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'manejoProductos', component: ManejoProductosComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'reporteView', component: ReporteViewComponent },
  { path: 'loginPasarela', component: LoginPasarelaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
