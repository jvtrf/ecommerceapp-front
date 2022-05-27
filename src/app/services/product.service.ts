import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products?size=100&';
  private categoryUrl = 'http://localhost:8080/api/product-category';
  constructor(private httpClient: HttpClient) {}

  getProductsList(categoryId: number): Observable<Product[]> {
    let url = this.baseUrl;
    if (categoryId != 0) {
      url = `http://localhost:8080/api/products/search/findByCategoryId?id=${categoryId}`;
    }
    console.log(url);
    return this.httpClient
      .get<GetResponseProducts>(url)
      .pipe(map((response) => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
