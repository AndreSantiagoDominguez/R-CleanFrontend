import { Injectable } from "@angular/core";
import { ProductRepository } from "../repositories/product.repository";
import { Observable } from "rxjs";  
import { Product } from "../domain/product.model";

@Injectable({
    providedIn: "root",
})
export class EditProductUseCase {
    constructor(private productRepository: ProductRepository) {}

    execute(id: number, product: Product): Observable<Product> {
        return this.productRepository.editProduct(id, product);
    }
}