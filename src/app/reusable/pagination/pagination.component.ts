import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { PaginationInfo } from "../../models/pagination-info";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [MatPaginator],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() paginationInfo: PaginationInfo = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  };
  @Input() disabled: boolean = false;

  @Output() pageChange = new EventEmitter<PaginationInfo>();

  handlePageEvent(e: PageEvent) {
    this.paginationInfo.pageIndex = e.pageIndex;
    this.paginationInfo.pageSize = e.pageSize;
    // this.paginationInfo.length = e.length;

    this.pageChange.emit(this.paginationInfo);
  }
}
