export interface ProductListDTO {
    links: {
      self: string;
    };
    products: {
      ID: number;
      Name: string;
      Price: number;
    }[];
    status: boolean;
  }