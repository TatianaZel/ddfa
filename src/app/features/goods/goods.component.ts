import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableComponent } from "../../reusable/table/table.component";
import { PaginationComponent } from "../../reusable/pagination/pagination.component";
import { FiltersComponent } from "../../reusable/filters/filters.component";
import { FilterOption } from "../../models/filter-option";
import { PaginationInfo } from "../../models/pagination-info";
import { selectProductsByFiltersAndPage, selectProductsError } from '../../store/goods/product.selectors';
import { loadProducts } from '../../store/goods/product.actions';
import { Product } from "../../models/poduct";
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, take } from "rxjs";
import { TitleCasePipe } from "@angular/common";

const INITIAL_PAGINATION: PaginationInfo = {
  pageIndex: 0,
  pageSize: 10,
  length: 0,
};

const FILTER_OPTIONS: FilterOption[] = [
  { key: 'name', type: 'text' },
  { key: 'description', type: 'text' },
  { key: 'price', type: 'text' },
  { key: 'category', type: 'select', options: [
      { value: 'Category 1', viewValue: 'Category 1' },
      { value: 'Category 2', viewValue: 'Category 2' },
      { value: 'Category 3', viewValue: 'Category 3' },
    ]},
];

const DISPLAYED_COLUMNS : string[] = ['id', 'name', 'category', 'price', 'description'];

@Component({
  selector: 'app-goods',
  standalone: true,
  imports: [
    FiltersComponent,
    TableComponent,
    PaginationComponent,
    TitleCasePipe,
  ],
  templateUrl: './goods.component.html',
  styleUrl: './goods.component.scss',
})
export class GoodsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = DISPLAYED_COLUMNS;
  filterOptions: FilterOption[] = FILTER_OPTIONS;

  paginationInfo: PaginationInfo = {...INITIAL_PAGINATION}; // if assign just constant here, all its properties will be readonly
  selectedFilters: any = {};

  isLoading = false;

  dataSource: Product[] = [];

  $error: Observable<Error>;
  $currentProducts: Observable<{products: Product[], total: number}> | undefined;

  errorSubscription: Subscription | undefined;
  currentProductsSubscription: Subscription | undefined;

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
    this.$error = this.store.select(selectProductsError);

    this.$error.subscribe((err) => {
      if (err) {
        this.isLoading = false;
        if (this.currentProductsSubscription) {
          this.currentProductsSubscription.unsubscribe();
        }
        alert('Error occurred!');
      }
    });

    this.getUrlParameters();
  }

  ngOnInit() {

  }

  onFiltersChanged(filters: any) {
    this.selectedFilters = filters
    this.updateData();
  }

  onPageChanged(pagination: PaginationInfo) {
    this.paginationInfo = pagination;
    this.updateData();
  }

  getUrlParameters() {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      this.selectedFilters = {};
      this.paginationInfo = {...INITIAL_PAGINATION};

      this.filterOptions.forEach((filerOption) => {
        if (params[filerOption.key]) {
          this.selectedFilters[filerOption.key] = params[filerOption.key]
        }
      });

      if (params['pageIndex']) {
        this.paginationInfo['pageIndex'] = params['pageIndex'];
      }

      if (params['pageSize']) {
        this.paginationInfo['pageSize'] = params['pageSize'];
      }

      this.updateData();
    });
  }

  updateUrlParameters() {
    const updatedParams: any = {};
    this.filterOptions.forEach((filerOption) => {
      if (this.selectedFilters[filerOption.key]) {
        updatedParams[filerOption.key] = this.selectedFilters[filerOption.key];
      }
    });
    updatedParams.pageIndex = this.paginationInfo.pageIndex.toString();
    updatedParams.pageSize = this.paginationInfo.pageSize.toString();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedParams,
    }).then(r => {}, e => {});
  }

  updateData() {
    this.isLoading = true;

    this.$currentProducts = this.store.select(selectProductsByFiltersAndPage({
      filters: this.selectedFilters,
      pagination: this.paginationInfo
    }));

    this.currentProductsSubscription = this.$currentProducts.subscribe((res) => {
      if (!res) { // if the data has not been loaded, we can dispatch loading
        this.store.dispatch(loadProducts({ filters: this.selectedFilters, pagination: this.paginationInfo }));
      } else {
        this.isLoading = false;
        this.dataSource = res.products;
        this.paginationInfo = {
          ...this.paginationInfo,
          length: res.total
        };
        this.updateUrlParameters();
        if (this.currentProductsSubscription) {
          this.currentProductsSubscription.unsubscribe(); // if the data has already been loaded, we can unsubscribe
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }

    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
  }
}
