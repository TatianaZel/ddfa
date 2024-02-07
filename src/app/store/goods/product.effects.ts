import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { catchError, of } from 'rxjs';
import * as productActions from './product.actions';
import { ProductService } from '../../features/goods/goods.service'

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.loadProducts),
      mergeMap(({ filters, pagination }) =>
        this.productService.getProducts(filters, pagination).pipe(
          map((res) => {
            const key = JSON.stringify({ filters, pagination: {pageIndex: pagination.pageIndex, pageSize: pagination.pageSize} });
            return productActions.loadProductsSuccess({ key, products: res.products, total: res.total });
          }),
          catchError((error) => of(productActions.loadProductsFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private productService: ProductService) {}
}
