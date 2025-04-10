import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductRepository } from './core/Products/repositories/product.repository';
import { ProductsApi } from './infraestructure/API/Products.api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsModule } from './UI/products/products.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsModule
  ],
  providers: [
    { provide: ProductRepository, useClass: ProductsApi }, 

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
