import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import { Product } from "../../models/poduct";
import { PaginationInfo } from "../../models/pagination-info";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products?';

  constructor(private http: HttpClient) {}

  getProducts(filters: any, pagination: PaginationInfo): Observable<{products: Product[], total: number}> {
    const params = {
      ...filters,
      _start: pagination.pageIndex * pagination.pageSize,
      _limit: pagination.pageSize.toString(),
    };

    const products$ = this.http.get<Product[]>(this.createQueryString(params));

    // unfortunately the JSON server doesn't have the ability to get just the total number of elements, so this would have to be changed for a real server
    const total$ = this.http.get<Product[]>(this.createQueryString(filters)).pipe(map(products => products.length));

    return forkJoin([products$, total$]).pipe(
      map(([products, total]) => {
        return { products, total };
      })
    );
  }

  private createQueryString(obj: any) {
    const queryString = Object.entries(obj)
      .filter(([key, value]) => value !== null && value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return this.apiUrl + queryString;
  }
}
