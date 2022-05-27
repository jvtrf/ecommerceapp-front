import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products?size=100&';
  constructor(private httpClient: HttpClient) {}

  getProductsList(categoryId: number): Observable<Product[]> {
    let url = this.baseUrl;
    if (categoryId != 0) {
      url = `http://localhost:8080/api/products/search/findByCategoryId?id=${categoryId}`;
    }
    console.log(url);
    return this.httpClient
      .get<GetResponse>(url)
      .pipe(map((response) => response._embedded.products));
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
