import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterName } from 'src/app/interfaces/filters';
import { LogicFilterType, LogicFilterTypes } from '../../../../interfaces/logic-filter-type';
import { logicOperatorTitles } from 'src/app/constants/filter';

interface Filter {
  name: FilterName;
  description: string;
  type: 'text' | 'range' | 'date';
  active?: boolean;
}
@Component({
  selector: 'app-add-filter-modal',
  templateUrl: './add-filter-modal.component.html',
  styleUrls: ['./add-filter-modal.component.scss']
})
export class AddFilterModalComponent { 
  public isOpenFilter = false;

  public filters: Filter[] = [
    {
      name: 'Nombre',
      description: 'Contiene los caracteres ingresados',
      type: 'text',
    },
    {
      name: 'Promedio',
      description: 'Promedio mayor o igual al ingresado',
      type: 'range',
    },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      type: LogicFilterType | null,
      section?: FilterName | null,
      value?: string,
    } = {type: null},
    private dialogRef: MatDialogRef<AddFilterModalComponent>
  ) { }
  
  public logicOperatorTitles = logicOperatorTitles;
  public types = LogicFilterTypes;
  public selectedType: LogicFilterType | null = null;

    public switchFilter(value?: boolean) {
      this.isOpenFilter = value ?? !this.isOpenFilter;
    }

  public chooseType(type: LogicFilterType | null) {
    if (!type) return;
    this.data.type = type;
  }

  public values = new Map<FilterName, string>([
    ['Nombre', ''],
    ['Promedio', ''],
  ]);

  private currentFilter: FilterName | null = null;

  chooseFilter(filter: Filter) {
    this.currentFilter = filter.name;
  }

  onSubmit() {
    this.data.value = this.values.get(this.currentFilter!)!;
    this.data.section = this.currentFilter!;
    this.dialogRef.close(this.data);
  }

  onChange(event: Event, filterName: FilterName) {
    this.chooseFilter(this.filters.find(filter => filter.name === filterName)!);
    const target = event.target as HTMLInputElement;
    this.values.set(this.currentFilter!, target.value);
  }

  //TODO: Move to class
  isLeaf(type: LogicFilterType) {
    return type === 'LEAF';
  }

  getLeafType(): LogicFilterType {
    return 'LEAF';
  }

}