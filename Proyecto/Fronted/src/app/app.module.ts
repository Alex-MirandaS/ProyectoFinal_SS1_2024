import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AppComponent,
    CatalogoComponent,
    ShopBagComponent,
    LoginComponent,
    RegisterComponent,
    ManejoProductosComponent,
    HomeComponent,
    AdminComponent,
    ReportesComponent,
    ReporteViewComponent,
    LoginPasarelaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
