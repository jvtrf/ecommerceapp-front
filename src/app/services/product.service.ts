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
    let url: string = this.baseUrl;
    if (categoryId != 0) {
      url = `http://localhost:8080/api/products/search/findByCategoryId?id=${categoryId}`;
    }
    return this.httpClient
      .get<GetResponseProducts>(url)
      .pipe(map((response) => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  searchProducts(keyWord: string) {
    let url: string = `http://localhost:8080/api/products/search/findByNameContaining?name=${keyWord}`;
    return this.httpClient
      .get<GetResponseSearchProducts>(url)
      .pipe(map((response) => response._embedded.products));
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

interface GetResponseSearchProducts {
  _embedded: {
    products: Product[];
  };
}
