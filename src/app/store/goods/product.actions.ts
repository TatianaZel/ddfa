import { createAction, props } from '@ngrx/store';
import { Product } from "../../models/poduct";
import { PaginationInfo } from "../../models/pagination-info";

export const loadProducts = createAction('[Product] Load Products', props<{ pagination: PaginationInfo, filters: any }>());
export const loadProductsFailure = createAction('[Product] Load Products Failure', props<{ error: Error }>());
export const loadProductsSuccess = createAction('[Product] Load Products Success', props<{ key: string, products: Product[], total: number }>());
