import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReportesModule } from './reportes/reportes.module';
import { HttpClientModule } from '@angular/common/http';
import { TicketsModule } from './tickets/tickets.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { ConfigModule } from './configuracion/config.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReportesModule,
    TicketsModule,
    ProyectosModule,
    ConfigModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
