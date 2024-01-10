import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificacionesComponent } from './certificaciones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CertificacionesComponent],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class CertificacionesModule { }
