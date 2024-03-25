import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReportesModule } from './reportes/reportes.module';
import { HttpClientModule } from '@angular/common/http';
import { TicketsModule } from './tickets/tickets.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { ConfigModule } from './configuracion/config.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReportesModule,
    TicketsModule,
    ProyectosModule,
    ConfigModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
