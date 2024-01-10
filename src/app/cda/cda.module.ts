import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdaComponent } from './cda.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CdaComponent],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class CdaModule { }
