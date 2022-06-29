export interface ReceivedPayment {
  id: string;
  userId: string;
  user?: any;
  amount: string;
  productId: string;
  product?: any;
  createdAt: string;
  updatedAt: string;
}
