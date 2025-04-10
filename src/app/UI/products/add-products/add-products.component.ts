import { Component } from '@angular/core';
import { Product } from '../../../core/Products/domain/product.model';
import { CreateProductUseCase } from '../../../core/Products/useCases/createProduct.useCase';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  product = new Product(0, '', 0);

  constructor(
    private createProduct: CreateProductUseCase,
    private router: Router
  ) {}


  addProduct(): void {
    if (!this.product.name || !this.product.price) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre y el precio son obligatorios!',
        confirmButtonText: 'Entendido',
        background: '#1f2937',
        color: '#fff',
        iconColor: '#ef4444'
      });
      return;
    }

    this.createProduct.execute(this.product).subscribe({
      next: (createdProduct) => {
        Swal.fire({
          icon: 'success',
          title: '¡Producto creado!',
          text: 'El producto se ha registrado correctamente',
          showConfirmButton: true,
          confirmButtonText: 'Continuar',
          timer: 3000,
          timerProgressBar: true,
          willClose: () => {
            this.router.navigate(['/products']);
          }
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error crítico',
          text: `Error al crear producto: ${err.message}`,
          confirmButtonText: 'Cerrar',
          background: '#1f2937',
          color: '#fff',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
        console.error('Error detallado:', err);
      }
    });
  }
}