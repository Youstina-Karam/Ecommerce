import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SearchPipe } from '../search.pipe';
import { TermTextPipe } from '../term-text.pipe';
import { RouterModule } from '@angular/router';
import { ErrorhandlerComponent } from './components/errorhandler/errorhandler.component';


@NgModule({
  declarations: [
    FooterComponent,
    ProductCardComponent,
    TermTextPipe,
    SearchPipe,
    ErrorhandlerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [FooterComponent,
    ReactiveFormsModule,
    FormsModule,
    ProductCardComponent,
    TermTextPipe,
    SearchPipe,
    ErrorhandlerComponent,
  ]
})
export class SharedModule { }
