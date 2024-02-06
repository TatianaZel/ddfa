import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/goods/goods.component').then(mod => mod.GoodsComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
