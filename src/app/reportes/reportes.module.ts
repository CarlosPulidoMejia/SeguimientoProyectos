import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesComponent } from './reportes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [ReportesComponent],
  imports: [
    FormsModule,
    CommonModule,
    NgxChartsModule
  ]
})
export class ReportesModule { }
