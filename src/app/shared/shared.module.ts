/* Modules */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    PickerModule
  ],
  declarations: [LoadingComponent],
  entryComponents: [],
  exports: [
    LoadingComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    PickerModule
  ]
})
export class SharedModule {}
