import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterName } from 'src/app/interfaces/filters';
import { LogicFilterType, LogicFilterTypes } from '../../../interfaces/logic-filter-type';

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
      description: 'Nombre o apellido del estudiante (En construcción 👷🏼‍♂️)',
      type: 'text',
    },
    {
      name: 'Promedio',
      description: 'Promedio del estudiante (En construcción 👷🏼‍♂️)',
      type: 'range',
    },
    {
      name: 'Fecha de ingreso',
      description: 'Fecha de ingreso del estudiante (En construcción 👷🏼‍♂️)',
      type: 'date',
      active: true,
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
  
  types = LogicFilterTypes;

  chooseType(type: LogicFilterType | null) {
    if (!type) return;
    this.data.type = type;
  }

  public values = new Map<FilterName, string>([
    ['Nombre', ''],
    ['Promedio', ''],
    ['Fecha de ingreso', ''],
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

  onChange(event: Event) {
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