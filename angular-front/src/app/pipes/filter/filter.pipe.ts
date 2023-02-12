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
		['Promedio', (student: Student, value: string) => student.averageGrade ? student.averageGrade >= Number(value): true],
  	]);

  	private logicFilterFunction = new Map([
		['AND', (children: FlatNodeFilter[], student: Student, treeData: TreeFilter) => children.every((child: FlatNodeFilter) => this.isValid(child, student, treeData))],
		['OR', (children: FlatNodeFilter[], student: Student, treeData: TreeFilter) => children.some((child: FlatNodeFilter) => this.isValid(child, student, treeData))],
		['NOT', (children: FlatNodeFilter[], student: Student, treeData: TreeFilter) => !children.some((child: FlatNodeFilter) => this.isValid(child, student, treeData))],
  	]);
  
	private isValidStudent(node: FlatNodeLeaf, student: Student): boolean {
		console.log(node, this.filterFunction);
		const filter = node.section? this.filterFunction.get(node.section): null;
		const isValid = filter ? filter(student, node.value) : false;
		return isValid;
	}

	public isValid(node: FlatNodeFilter, student: Student, treeData: TreeFilter): boolean {
		if (!node) return true;
		if (node.type === 'LEAF') return this.isValidStudent(node as FlatNodeLeaf, student);
		
		let children = treeData.getChildren(node);
		if (!children.length) return true;

		const logicFilter = this.logicFilterFunction.get(node.type);
		const isValid = logicFilter ? logicFilter(children, student, treeData) : false;
		return isValid;
	}

	public transform(students: Student[] | null, treeData: TreeFilter | undefined): Student[] {
		if (!students) return [];
		const treeRoot = treeData?.tree[0];
		if (!treeRoot) return students;
		console.log(treeRoot);
		return students.filter((student: Student) => {
			return this.isValid(treeRoot, student, treeData)
		});
	}

}
