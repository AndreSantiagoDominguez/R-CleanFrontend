import { Product } from '../../domain/product.model';
import { ProductDTO } from '../dtos/product.dto';
import { ProductListDTO } from '../dtos/productList.dto';
import { ProductEditDTO } from '../dtos/productEdit.dto';
import { ProductDeleteDTO } from '../dtos/productDelete.dto';

export class ProductMapper {
  

  static fromDTO(dto: ProductDTO): Product {
    if (!dto || !dto.data || !dto.data.attributes) {
      throw new Error('El DTO no tiene la estructura esperada: ' + JSON.stringify(dto));
    }
    const { id, attributes } = dto.data;
    return new Product(id, attributes.name, attributes.price);
  }

  
  static fromProductListDTO(dto: ProductListDTO): Product[] {
    if (!dto || !dto.products) {
      return [];
    }
    return dto.products.map(item => new Product(item.ID, item.Name, item.Price));
  }


  static fromEditDTO(dto: ProductEditDTO, id: number, name: string, price: number): Product {
    if (!dto.status) throw new Error('Error en el DTO de edición');
    return new Product(id, name, price);
  }


  static toDeleteDTO(message: string): ProductDeleteDTO {
    return {
      status: true,
      message
    };
  }
}
