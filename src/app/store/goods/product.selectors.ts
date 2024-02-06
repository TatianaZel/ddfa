import { createSelector } from '@ngrx/store';
import { PaginationInfo } from "../../models/pagination-info";

export const selectProductsCache = (state: any) => {
  return state.products.productsCache;
};

export const selectProductsByFiltersAndPage = (props: { pagination: PaginationInfo; filters: any }) =>
  createSelector(
    selectProductsCache,
    (cache) => {
      // const cache: { [key: string]: Product[] } = state.productsCache;  // Adjust the property name if needed
      const key = JSON.stringify({ filters: props.filters, pagination: props.pagination });
      return cache[key];
    }
  );

export const selectProductsError = (state: any) => {
  return state.products.error;
};

