import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsComponent } from './tickets.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TicketsComponent],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class TicketsModule { }
