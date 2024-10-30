import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ShopBagComponent } from './pages/shop-bag/shop-bag.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ManejoProductosComponent } from './pages/manejo-productos/manejo-productos.component';

const routes: Routes = [
  { path: '', component: CatalogoComponent },
  { path: 'shopBag', component: ShopBagComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'manejoProductos', component: ManejoProductosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
