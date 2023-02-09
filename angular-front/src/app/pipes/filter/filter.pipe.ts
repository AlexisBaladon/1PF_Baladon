import { Pipe, PipeTransform } from '@angular/core';
import Student from 'src/app/interfaces/student';
import { FlatNode } from 'src/app/logic/filter/node';
import { FilterName } from '../../interfaces/filters';
import { LogicFilterType } from '../../interfaces/logic-filter-type';
import { Tree } from '../../logic/filter/tree';

type FlatNodeFilter = FlatNode<LogicFilterType, FilterName>;
type TreeFilter = Tree<LogicFilterType, FilterName>;
type FlatNodeLeaf = FlatNode<'LEAF', FilterName>;

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  	private filterFunction = new Map<FilterName, (student: Student, value: string) => boolean>([
		['Nombre', (student: Student, value: string) => student.name.toLowerCase().includes(value.toLowerCase())],
		['Promedio', (student: Student, value: string) => student.averageGrade ? student.averageGrade < Number(value): true],
		['Fecha de ingreso', (student: Student, value: string) => student.admissionDate < new Date(value)]
  	]);

  	private logicFilterFunction = new Map([
		['AND', (children: FlatNodeFilter[], student: Student, treeData: TreeFilter) => children.every((child: FlatNodeFilter) => this.isValid(child, student, treeData))],
		['OR', (children: FlatNodeFilter[], student: Student, treeData: TreeFilter) => children.some((child: FlatNodeFilter) => this.isValid(child, student, treeData))],
		['NOT', (children: FlatNodeFilter[], student: Student, treeData: TreeFilter) => !children.some((child: FlatNodeFilter) => this.isValid(child, student, treeData))],
  	]);
  
	private isValidStudent(node: FlatNodeLeaf, student: Student): boolean {
		const filter = node.section? this.filterFunction.get(node.section): null;
		const isValid = filter ? filter(student, node.value) : false;
		return isValid;
	}

	private isValid(node: FlatNodeFilter, student: Student, treeData: TreeFilter): boolean {
		if (!node) return true;
		if (node.type === 'LEAF') return this.isValidStudent(node as FlatNodeLeaf, student);
		
		let children = treeData.getChildren(node);
		if (!children.length) return true;

		const logicFilter = this.logicFilterFunction.get(node.type);
		const isValid = logicFilter ? logicFilter(children, student, treeData) : false;
		return isValid;
	}

	transform(students: Student[], treeData: TreeFilter | undefined): Student[] {
		if (!treeData || !treeData.tree[0]) return students;

		return students.filter((student: Student) => {
			return this.isValid(treeData.tree[0], student, treeData)
		});
	}

}
