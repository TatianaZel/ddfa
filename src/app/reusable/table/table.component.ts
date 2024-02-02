import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NgForOf, TitleCasePipe } from "@angular/common";

@Component({
  selector: 'app-table',
  standalone: true,
    imports: [MatTableModule, NgForOf, TitleCasePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() dataSource: any[] = [];
  @Input() displayedColumns: string[] = [];
}
