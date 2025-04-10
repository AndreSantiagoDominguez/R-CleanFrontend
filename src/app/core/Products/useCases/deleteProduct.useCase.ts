import { Injectable } from "@angular/core";
import { ProductRepository } from "../repositories/product.repository";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class DeleteProductUseCase {
    constructor(private productRepository: ProductRepository) {}

    execute(id: number): Observable<boolean> {
        return this.productRepository.deleteProduct(id);
    }
}