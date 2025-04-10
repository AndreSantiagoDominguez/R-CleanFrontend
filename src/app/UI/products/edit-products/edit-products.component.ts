import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../core/Products/domain/product.model';
import { EditProductUseCase } from '../../../core/Products/useCases/editProduct.useCase';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {
  product: Product = new Product(0, '', 0);

  constructor(
    private route: ActivatedRoute,
    private editProductUseCase: EditProductUseCase,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.product.id = id;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'ID de producto no encontrado',
        background: '#1f2937',
        color: '#fff',
        confirmButtonText: 'Volver',
        willClose: () => {
          this.router.navigate(['/products']);
        }
      });
    }
  }

  editProduct(): void {
    if (!this.product.name || !this.product.price) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Nombre y precio son obligatorios',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#3b82f6',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    this.editProductUseCase.execute(this.product.id, this.product).subscribe({
      next: (editedProduct: Product) => {
        Swal.fire({
          icon: 'success',
          title: '¡Actualizado!',
          text: 'Producto modificado exitosamente',
          background: '#1f2937',
          color: '#fff',
          showConfirmButton: true,
          confirmButtonText: 'Continuar',
          timer: 2500,
          timerProgressBar: true,
          willClose: () => {
            this.router.navigate(['']); 
          }
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error en la actualización',
          text: `Detalles: ${err.message}`,
          background: '#1f2937',
          color: '#fff',
          confirmButtonText: 'Cerrar',
          showClass: {
            popup: 'animate__animated animate__headShake'
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