import { Component } from '@angular/core';
import { DeleteProductUseCase } from '../../../core/Products/useCases/deleteProduct.useCase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-products',
  templateUrl: './delete-products.component.html',
  styleUrls: ['./delete-products.component.css']  
})
export class DeleteProductsComponent {
  productId: number = 0; 

  constructor(
    private deleteProductUseCase: DeleteProductUseCase,
    private router: Router
  ) {}

  deleteProduct(): void {
    if (!this.productId || this.productId <= 0) {
      alert('Por favor, ingresa un ID válido.');
      return;
    }

    this.deleteProductUseCase.execute(this.productId).subscribe({
      next: (status: boolean) => {
        if (status) {
          alert('Producto eliminado correctamente.');
          this.router.navigate(['']);
        } else {
          alert('No se pudo eliminar el producto.');
        }
      },
      error: (error) => {
        console.error('Error al eliminar el producto:', error);
        alert('Ocurrió un error al eliminar el producto.');
      }
    });
  }
}
