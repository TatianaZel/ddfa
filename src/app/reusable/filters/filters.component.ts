import {Component, EventEmitter, Input, Output, OnInit, ChangeDetectionStrategy} from '@angular/core';
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
  styleUrl: './filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements OnInit {
  @Input() filterOptions: FilterOption[] = [];
  @Input() defaultFilters: any = {};
  @Input() disabled: boolean = false;
  @Output() filtersChanged = new EventEmitter<any>();

  filterForm: FormGroup | any;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const formControls: any = {};
    this.filterOptions.forEach(option => {
      formControls[option.key] = [this.defaultFilters[option.key] || null];
    });

    this.filterForm = this.fb.group(formControls);

    this.filterForm.valueChanges.subscribe((changes: any) => {
      this.applyFilters();
    });
  }

  applyFilters() {
    const newFilters = {...this.filterForm.value}

    for (let prop in newFilters) {
      if (newFilters[prop] === null || newFilters[prop] === '') {
        delete newFilters[prop];
      }
    }

    this.filtersChanged.emit(newFilters);
  }
}
