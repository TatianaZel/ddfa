import { ActionReducerMap } from '@ngrx/store';

import * as fromProducts from './goods';

export interface State {
  products: fromProducts.ProductState;
}

export const reducers: ActionReducerMap<State> = {
  products: fromProducts.productReducer,
};

export const effects = [
  fromProducts.ProductEffects,
];
