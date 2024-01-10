import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevolucionesComponent } from './devoluciones.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DevolucionesComponent],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class DevolucionesModule { }
