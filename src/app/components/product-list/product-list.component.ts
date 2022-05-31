import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean;

  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchproducts();
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService
      .getProductListPaginate(
        this.pageNumber - 1,
        this.pageSize,
        this.currentCategoryId
      )
      .subscribe(this.processResult());
  }
  handleSearchproducts() {
    const keyWord: string = this.route.snapshot.paramMap.get('keyword');
    this.productService
      .searchProductsPaginate(this.pageNumber - 1, this.pageSize, keyWord)
      .subscribe(this.processResult());
  }

  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber;
    this.listProducts();
  }
}
