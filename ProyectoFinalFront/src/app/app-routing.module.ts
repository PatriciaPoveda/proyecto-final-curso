import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormParaLeerComponent } from './form-para-leer/form-para-leer.component';
import { FormComponent } from './form/form.component';
import { LibroLeidoComponent } from './libro-leido/libro-leido.component';
import { LibroParaLeerComponent } from './libro-para-leer/libro-para-leer.component';
import { LoginComponent } from './usuarios/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/libros-leidos',
    pathMatch: 'full',
  },
  {
    path: 'libros-leidos',
    component: LibroLeidoComponent,
  },
  {
    path: 'libros-leidos/añadir',
    component: FormComponent,
  },
  {
    path: 'libros-leidos/editar/:id',
    component: FormComponent,
  },
  {
    path: 'libros-para-leer',
    component: LibroParaLeerComponent,
  },
  {
    path: 'libros-para-leer/añadir',
    component: FormParaLeerComponent,
  },
  {
    path: 'libros-para-leer/editar/:id',
    component: FormParaLeerComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'libros-leidos',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
