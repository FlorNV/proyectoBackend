import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LibrosComponent } from './components/libros/libros.component';
import { LibroFormComponent } from './components/libro-form/libro-form.component';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';
import { TransaccionFormComponent } from './components/transaccion-form/transaccion-form.component';
import { PasajesComponent } from './components/pasajes/pasajes.component';
import { PasajeFormComponent } from './components/pasaje-form/pasaje-form.component';

const routes: Routes = [
  { path: 'libros', component: LibrosComponent },
  { path: 'libro-form/:id', component: LibroFormComponent },
  { path: 'transacciones', component: TransaccionesComponent },
  { path: 'transaccion-form/:id', component: TransaccionFormComponent },
  { path: 'pasajes', component: PasajesComponent },
  { path: 'pasaje-form/:id', component: PasajeFormComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'libros' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LibrosComponent, LibroFormComponent, TransaccionesComponent, TransaccionFormComponent, PasajesComponent, PasajeFormComponent];