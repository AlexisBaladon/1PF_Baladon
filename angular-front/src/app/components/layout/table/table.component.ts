import { Component, Input } from '@angular/core';
import databaseStudents from 'src/app/data/students';
import type { FilterName } from 'src/app/interfaces/filters';
import type { LogicFilterType } from 'src/app/interfaces/logic-filter-type';
import type { Tree } from 'src/app/logic/filter/tree';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() public filters: Tree<LogicFilterType, FilterName> | undefined;

  students = databaseStudents;

  studentsGradeStyle = [
    {style: 'color', styleValue: 'red', min: 0, max: 4},
    {style: 'color', styleValue: 'orange', min: 4, max: 6},
    {style: 'color', styleValue: 'green', min: 6, max: 10},
  ]
}
