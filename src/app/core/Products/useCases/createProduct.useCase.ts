import { Injectable } from '@angular/core';
import { ProductRepository } from '../repositories/product.repository';
import { Observable } from 'rxjs';
import { Product } from '../domain/product.model';

@Injectable({
    providedIn: 'root',
})
export class CreateProductUseCase {
    constructor(private productRepository: ProductRepository) {}

    execute(product: Product): Observable<Product> {
        return this.productRepository.addProduct(product);
    }
}