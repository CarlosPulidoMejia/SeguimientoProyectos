import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdaComponent } from './cda/cda.component';
import { ProyectosBauComponent } from './proyectos/proyectos.component';
import { EnvioOrdenesComponent } from './envio-ordenes/envio-ordenes.component';
import { CertificacionesComponent } from './certificaciones/certificaciones.component';


const routes: Routes = [
  { path: '', component: ProyectosBauComponent, pathMatch: 'full'},
  { path: 'Tickets', component:  EnvioOrdenesComponent, pathMatch: 'full'},
  { path: 'Certificaciones/BIM', component: CertificacionesComponent },
  { path: '**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
