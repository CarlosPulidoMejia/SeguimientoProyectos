import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdaComponent } from './cda/cda.component';
import { CertificacionesComponent } from './certificaciones/certificaciones.component';
import { DevolucionesComponent } from './devoluciones/devoluciones.component';
import { EnvioOrdenesComponent } from './envio-ordenes/envio-ordenes.component';

///BIM/Cdas

const routes: Routes = [
  { path: 'Certificaciones/BIM', component: CertificacionesComponent },
  { path: '', component: EnvioOrdenesComponent, pathMatch: 'full'},
  { path: 'Certificaciones/Devoluciones', component: DevolucionesComponent, pathMatch: 'full'},
  { path: 'BIM/Cdas', component: CdaComponent, pathMatch: 'full'},
  { path: '**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
