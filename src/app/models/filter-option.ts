export interface FilterOption {
  key: string,
  type: 'text' | 'select' | 'date',
  options?: { value: string; viewValue: string; }[]
}
