import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageProductsComponent } from './UI/products/page-products/page-products.component';
import { EditProductsComponent } from './UI/products/edit-products/edit-products.component';

const routes: Routes = [
  {path: "", component: PageProductsComponent},
  { path: 'products/edit/:id', component: EditProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
