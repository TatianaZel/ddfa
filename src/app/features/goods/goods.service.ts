import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from "../../models/poduct";
import { PaginationInfo } from "../../models/pagination-info";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products?';

  constructor(private http: HttpClient) {}

  getProducts(filters: any, pagination: PaginationInfo): Observable<Product[]> {
    const params = {
      ...filters,
      _start: pagination.pageIndex * pagination.pageSize,
      _limit: pagination.pageSize.toString(),
    };

    return this.http.get<Product[]>(this.createQueryString(params)); // to do ! (add parameters)
  }

  private createQueryString(obj: any) {
    const queryString = Object.entries(obj)
      .filter(([key, value]) => value !== null && value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return this.apiUrl + queryString;
    // return this.apiUrl;
  }
}
