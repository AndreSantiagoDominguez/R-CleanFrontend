export interface ProductDTO {
    data: {
      id: number;
      type: string;
      attributes: {
        name: string;
        price: number;
      };
    };
    links: {
      self: string;
    };
    status: boolean;
  }
  