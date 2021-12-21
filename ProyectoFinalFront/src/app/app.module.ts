import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './usuarios/login/login.component';
import { LibroLeidoComponent } from './libro-leido/libro-leido.component';
import { LibroLeidoService } from './libro-leido/libro-leido-service';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { LibroParaLeerComponent } from './libro-para-leer/libro-para-leer.component';
import { FormParaLeerComponent } from './form-para-leer/form-para-leer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LibroLeidoComponent,
    FormComponent,
    LibroParaLeerComponent,
    FormParaLeerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [LibroLeidoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
