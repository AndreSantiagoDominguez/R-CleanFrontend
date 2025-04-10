import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../core/Products/domain/product.model';
import { ProductRepository } from '../../../core/Products/repositories/product.repository';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.css']
})
export class TableProductsComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(
    private productRepository: ProductRepository,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productRepository.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Productos cargados',
          showConfirmButton: false,
          background: '#1f2937',
          color: '#fff',
          timer: 1500
        });
      },
      error: (error) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error de carga',
          text: 'No se pudieron obtener los productos',
          background: '#1f2937',
          color: '#fff',
          confirmButtonColor: '#3b82f6',
          confirmButtonText: 'Reintentar',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          willClose: () => {
            this.loadProducts();
          }
        });
        console.error('Error detallado:', error);
      }
    });
  }

  deleteProduct(product: Product): void {
    Swal.fire({
      icon: 'warning',
      title: 'Confirmar eliminación',
      html: `¿Estás seguro de eliminar <b>${product.name}</b>?`,
      background: '#1f2937',
      color: '#fff',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3b82f6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      showClass: {
        popup: 'animate__animated animate__headShake'
      },
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.executeDelete(product);
      }
    });
  }

  private executeDelete(product: Product): void {
    Swal.fire({
      title: 'Eliminando producto...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      background: '#1f2937',
      color: '#fff'
    });

    this.productRepository.deleteProduct(product.id).subscribe({
      next: (status) => {
        Swal.close();
        if (status) {
          this.showSuccessDeleteAlert(product.name);
          this.loadProducts();
        } else {
          this.showErrorDeleteAlert('No se pudo eliminar el producto');
        }
      },
      error: (error) => {
        Swal.close();
        this.showErrorDeleteAlert(error.message);
        console.error('Error detallado:', error);
      }
    });
  }

  private showSuccessDeleteAlert(productName: string): void {
    Swal.fire({
      icon: 'success',
      title: '¡Eliminado!',
      html: `<b>${productName}</b> fue eliminado correctamente`,
      background: '#1f2937',
      color: '#fff',
      showConfirmButton: false,
      timer: 2000
    });
  }

  private showErrorDeleteAlert(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      background: '#1f2937',
      color: '#fff',
      confirmButtonColor: '#3b82f6',
      confirmButtonText: 'Entendido',
      showClass: {
        popup: 'animate__animated animate__shakeX'
      }
    });
  }

  editProduct(product: Product): void {
    this.router.navigate(['/products/edit', product.id]);
  }
}