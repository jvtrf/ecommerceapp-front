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
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';
  constructor(private httpClient: HttpClient) {}

  getProductListPaginate(
    page: number,
    pageSize: number,
    categoryId: number
  ): Observable<GetResponseProducts> {
    let url: string = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${pageSize}`;
    console.log(url);
    return this.httpClient.get<GetResponseProducts>(url);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    console.log(this.httpClient);
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  searchProductsPaginate(
    page: number,
    pageSize: number,
    keyWord: string
  ): Observable<GetResponseSearchProducts> {
    let url: string = `http://localhost:8080/api/products/search/findByNameContaining?name=${keyWord}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseSearchProducts>(url);
  }

  getProduct(productId: string): Observable<Product> {
    let url: string = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(url);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
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
