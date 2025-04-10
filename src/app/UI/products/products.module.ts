import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableProductsComponent } from './table-products/table-products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { DeleteProductsComponent } from './delete-products/delete-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { PageProductsComponent } from './page-products/page-products.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    TableProductsComponent,
    AddProductsComponent,
    DeleteProductsComponent,
    EditProductsComponent,
    PageProductsComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    TableProductsComponent,
    AddProductsComponent,
    DeleteProductsComponent,
    EditProductsComponent,
    PageProductsComponent,
  ],
})
export class ProductsModule { }
