import { Component } from '@angular/core';
import { TableComponent } from "../../reusable/table/table.component";
import { PaginationComponent } from "../../reusable/pagination/pagination.component";
import { FiltersComponent } from "../../reusable/filters/filters.component";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-goods',
  standalone: true,
  imports: [
    FiltersComponent,
    TableComponent,
    PaginationComponent
  ],
  templateUrl: './goods.component.html',
  styleUrl: './goods.component.scss'
})
export class GoodsComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  filterOption: any[] = [ /// add an interface filterOption
    { key: 'name', type: 'text' },
    { key: 'category', type: 'select', options: [
        { value: '1', viewValue: 'Category 1' },
        { value: '2', viewValue: 'Category 2' },
        { value: '3', viewValue: 'Category 3' },
      ]},
    { key: 'date', type: 'date' },
  ]

  dataSource = ELEMENT_DATA;
  goodsAmount: number = 100;

  pageIndex = 0;

  isLoading = false;

  onFiltersChanged(filters: any) {
    console.log('Filters changed:', filters);
  }

  onPageChanged(e: any) {
    console.log('Page changed:', e);
  }

  loadData() {

  }
}
