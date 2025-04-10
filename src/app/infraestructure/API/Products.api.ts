import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ProductRepository } from "../../core/Products/repositories/product.repository";
import { ProductDTO } from "../../core/Products/adapters/dtos/product.dto";
import { ProductListDTO } from "../../core/Products/adapters/dtos/productList.dto";
import { ProductEditDTO } from "../../core/Products/adapters/dtos/productEdit.dto";
import { ProductDeleteDTO } from "../../core/Products/adapters/dtos/productDelete.dto";
import { Product } from "../../core/Products/domain/product.model";
import { ProductMapper } from "../../core/Products/adapters/mappers/product.mapper";

@Injectable({
  providedIn: "root",
})
export class ProductsApi implements ProductRepository {
  private baseUrl = 'http://localhost:8800/products/';

  constructor(private http: HttpClient) {}

 addProduct(product: Product): Observable<Product> {
    return this.http.post<ProductDTO>(this.baseUrl, product)
      .pipe(
        map((dto: ProductDTO) => ProductMapper.fromDTO(dto))
      );
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<ProductListDTO>(this.baseUrl)
      .pipe(
        map((dto: ProductListDTO) => ProductMapper.fromProductListDTO(dto))
      );
  }

  editProduct(id: number, product: Product): Observable<Product> {
    return this.http
      .put<ProductEditDTO>(`${this.baseUrl}${id}`, {
        name: product.name,
        price: product.price,
      })
      .pipe(
        map((dto) => ProductMapper.fromEditDTO(dto, id, product.name, product.price))
      );
  }
  
 deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<ProductDeleteDTO>(`${this.baseUrl}${id}`)
      .pipe(
        map((dto: ProductDeleteDTO) => dto.status)
      );
  }
}
