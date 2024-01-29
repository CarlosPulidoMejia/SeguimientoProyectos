import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesComponent } from './reportes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReportesComponent],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class ReportesModule { }
