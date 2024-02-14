import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConfigComponent],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class ConfigModule { }
