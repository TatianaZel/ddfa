import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { NgForOf, NgSwitch, NgSwitchCase, TitleCasePipe } from "@angular/common";
import { MatDatepickerModule, MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatOption } from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";
import { provideNativeDateAdapter } from '@angular/material/core';
import { FilterOption } from "../../models/filter-option";

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    TitleCasePipe,
    NgForOf,
    MatDatepickerToggle,
    MatDatepicker,
    MatOption,
    MatSelect,
    NgSwitch,
    NgSwitchCase,
    MatDatepickerModule,
    MatDatepickerInput
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit {
  @Input() filterOptions: FilterOption[] = [];
  @Input() disabled: boolean = false;
  @Output() filtersChanged = new EventEmitter<any>();

  filterForm: FormGroup | any;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const formControls: any = {};
    this.filterOptions.forEach(option => {
      formControls[option.key] = [null];
    });

    this.filterForm = this.fb.group(formControls);

    this.filterForm.valueChanges.subscribe((changes: any) => {
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filtersChanged.emit(this.filterForm.value);
  }
}
