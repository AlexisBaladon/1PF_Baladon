import { Pipe, PipeTransform } from '@angular/core';
import Student from 'src/app/interfaces/student';
import { FlatNode } from 'src/app/logic/filter/node';
import { FilterName } from '../interfaces/filters';
import { LogicFilterType } from '../interfaces/logic-filter-type';
import { Tree } from '../logic/filter/tree';

type FlatNodeFilter = FlatNode<LogicFilterType, FilterName>;
type TreeFilter = Tree<LogicFilterType, FilterName>;

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  private filterFunction = new Map([
    ['Nombre', (student: Student, value: string) => !student.name.toLowerCase().includes(value.toLowerCase())],
    ['Promedio', (student: Student, value: string) => student.averageGrade < Number(value)],
    ['Fecha de ingreso', (student: Student, value: string) => student.admissionDate < new Date(value)]
  ]);

  private logicFilterFunction = new Map([
    ['AND', (children: FlatNodeFilter[], student: Student, treeData: TreeFilter) => children.some((child: FlatNodeFilter) => this._isFiltered(child, student, treeData))],
    ['OR', (children: FlatNodeFilter[], student: Student, treeData: TreeFilter) => children.every((child: FlatNodeFilter) => this._isFiltered(child, student, treeData))],
    ['NOT', (children: FlatNodeFilter[], student: Student, treeData: TreeFilter) => !children.every((child: FlatNodeFilter) => this._isFiltered(child, student, treeData))],
  ]);
  
  private _isFilteredStudent(node: FlatNodeFilter, student: Student): boolean {
    if (node.type !== 'LEAF') return true;

    const filter = node.section? this.filterFunction.get(node.section): null;
    return filter ? filter(student, node.value) : true;
  }

  private _isFiltered(node: FlatNodeFilter, student: Student, treeData: TreeFilter): boolean {
    if (!node) return false;
    if (node.type === 'LEAF')  return this._isFilteredStudent(node, student);
    
    let children = treeData.getChildren(node);
    if (!children.length) return false;

    const logicFilter = this.logicFilterFunction.get(node.type);
    return logicFilter ? logicFilter(children, student, treeData) : false;
  }

  transform(students: Student[], treeData: TreeFilter | undefined): Student[] {
    console.log(treeData, students);
    if (!treeData || !treeData.tree[0]) return students;

    return students.filter((student: Student) => {
      return !this._isFiltered(treeData.tree[0], student, treeData)
    });
  }

}
