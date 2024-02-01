import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReportesModule } from './reportes/reportes.module';
import { HttpClientModule } from '@angular/common/http';
import { TicketsModule } from './tickets/tickets.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { CdaModule } from './cda/cda.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReportesModule,
    TicketsModule,
    ProyectosModule,
    CdaModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
