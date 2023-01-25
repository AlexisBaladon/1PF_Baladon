import { Component } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  filters = [
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
}
