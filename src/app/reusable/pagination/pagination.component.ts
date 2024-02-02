import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginator, PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [MatPaginator],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() length: number = 0;
  @Input() pageSize: number = 0;
  @Input() pageIndex: number = 0;
  @Input() disabled: boolean = false;

  @Output() pageChange = new EventEmitter<PageEvent>();

  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.pageChange.emit(this.pageEvent); ///////
  }
}
