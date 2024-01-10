import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdaComponent } from './cda/cda.component';
import { DevolucionesComponent } from './devoluciones/devoluciones.component';
import { EnvioOrdenesComponent } from './envio-ordenes/envio-ordenes.component';
import { CertificacionesComponent } from './certificaciones/certificaciones.component';

///BIM/Cdas

const routes: Routes = [
  { path: '', component: DevolucionesComponent, pathMatch: 'full'},
  { path: 'Certificaciones/Envio', component:  EnvioOrdenesComponent, pathMatch: 'full'},
  { path: 'Certificaciones/BIM', component: CertificacionesComponent },
  { path: '**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
