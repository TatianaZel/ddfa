import { createReducer, on } from '@ngrx/store';
import * as productActions from './product.actions';
import { ProductState } from "./product.state";

export const initialState: ProductState = {
  productsCache: {},
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(productActions.loadProductsSuccess, (state, { key, products }) => ({
    ...state,
    productsCache: {
      ...state.productsCache,
      [key]: products
    },
    error: null
  })),
  on(productActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);


