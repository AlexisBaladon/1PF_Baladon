import type Student from "src/app/interfaces/student";
import { isStudent } from "src/app/interfaces/student";
import { Filterable } from "./filterable";
import { LogicNode } from "./logicNode";

export class LogicFilterNode<Type, Section> extends LogicNode<Type, Section> {
    private filter: Filter;

    constructor(id: string, title: string, type: Type, section: Section, level: number = 0, parentNode: LogicNode<Type, Section> | null = null, children: LogicNode<Type, Section>[] = [], isExpanded: boolean = false, filter: Filter) {
        super(id, title, type, section, level, parentNode, children, isExpanded);
        this.filter = filter;
    }

    public evaluate(filterable: Filterable): boolean {
        return this.filter.evaluate(filterable);
    }

    public deepCopy(): LogicFilterNode<Type, Section> {
        return new LogicFilterNode<Type, Section>(this.id, this.title, this.type, this.section, this.level, this.parentNode, this.children.map(child => child.deepCopy()), this.isExpanded, this.filter);
    }

    public override isLeaf(): boolean { return true; }
}

export abstract class Filter {
    abstract isValidType(filterable: Filterable): boolean;
    abstract evaluate(filterable: Filterable): boolean;
}

export abstract class StudentFilter extends Filter {
    isValidType(filterable: Filterable): boolean {
        return isStudent(filterable);
    }
}

export class StudentNameFilter extends StudentFilter {
    private name: string;
    
    constructor(name: string) {
        super();
        this.name = name;
    }

    public evaluate(filterable: Filterable): boolean {
        return this.isValidType(filterable) && 
        (filterable as Student).name.toLowerCase().includes(this.name.toLowerCase());
    }
}

export class StudentGradeFilter extends StudentFilter {
    grade: number;

    constructor(grade: number) {
        super();
        this.grade = grade;
    }

    public evaluate(filterable: Filterable): boolean {
        const averageGrade = (filterable as Student).averageGrade;
        return this.isValidType(filterable) && 
        averageGrade !== null &&
        averageGrade >= this.grade;
    }
}