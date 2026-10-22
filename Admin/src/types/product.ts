export interface Product {
    id?: string;
    farmerName: string;
    productImage: string;
    productName: string;
    price: number;
    quantity: number;
    description: string;
    address: string;
  }

  export interface ProductRequest {
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    buyerName: string;
    farmerName: string;
    neededQuantity: number;
    status: 'pending' | 'accepted';
    createdAt: string;
  }