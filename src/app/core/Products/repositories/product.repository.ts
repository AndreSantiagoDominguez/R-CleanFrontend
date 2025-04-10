import { Observable } from "rxjs";
import { Product } from "../domain/product.model";

export abstract class ProductRepository {
  abstract addProduct(product: Product): Observable<Product>;
  abstract getAllProducts(): Observable<Product[]>;
  abstract editProduct(id: number, product: Product): Observable<Product>;
  abstract deleteProduct(id: number): Observable<boolean>;
}