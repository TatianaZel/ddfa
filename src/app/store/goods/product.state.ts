import { Product } from "../../models/poduct";

export interface ProductState {
  productsCache: { [key: string]: Product[]}; // Product cache, where the key is a unique identifier for a combination of filters and pagination
  error: Error | null,
}
