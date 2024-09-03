

type product = {
    _id : strin;
    id: number;
    brand: string;
    title: string;
    old_price: number;
    price: number;
    best_seller: boolean;
    stock: boolean;
    stock_quantity: number;
    description: string;
    category: string;
    images: string[];
    rating: number;
  };


  type PartialProduct = {
    id: number;
    title?: string;
    brand?: string;
    price?: number;
    images?: string[];
    stock_quantity? : number;
    productQuantity? : number | null | undefined;
  }