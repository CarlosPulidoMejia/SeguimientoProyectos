import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CertificacionesModule } from './certificaciones/certificaciones.module';
import { HttpClientModule } from '@angular/common/http';
import { EnvioOrdenesModule } from './envio-ordenes/envio-ordenes.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { CdaModule } from './cda/cda.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CertificacionesModule,
    EnvioOrdenesModule,
    ProyectosModule,
    CdaModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
