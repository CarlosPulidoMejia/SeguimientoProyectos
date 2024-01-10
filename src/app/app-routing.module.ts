import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyectoBauComponent } from './proyecto/proyecto.component';///devoluciones/devoluciones.component'
import { EnvioOrdenesComponent } from './envio-ordenes/envio-ordenes.component';
import { CertificacionesComponent } from './certificaciones/certificaciones.component';

///BIM/Cdas

const routes: Routes = [
  { path: 'Certificaciones/BIM', component: CertificacionesComponent },
  { path: '', component: ProyectoBauComponent, pathMatch: 'full'},
  { path: 'Certificaciones/Devoluciones', component: EnvioOrdenesComponent, pathMatch: 'full'},
  { path: '**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
