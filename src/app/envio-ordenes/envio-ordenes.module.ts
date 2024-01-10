import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvioOrdenesComponent } from './envio-ordenes.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EnvioOrdenesComponent],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class EnvioOrdenesModule { }
