import { Filterable } from "./filterable";

export abstract class LogicNode<Type, Section> {
    id: string;
    parentNode: LogicNode<Type, Section> | null;
    children: LogicNode<Type, Section>[];
    isExpanded: boolean;
    title: string;
    type: Type;
    level: number;
    section: Section;

    abstract evaluate(filterable: Filterable): boolean;
    abstract deepCopy(): LogicNode<Type, Section>;
    switchExpand() { this.isExpanded = !this.isExpanded; }
    isParentExpanded(): boolean { return this.parentNode?.isExpanded === true; }
    isLeaf(): boolean { return false; }
    addChild(child: LogicNode<Type, Section>) { this.children.push(child); }
    hasChildren(): boolean { return this.children.length > 0; }
    chopTree(): void { this.children.forEach(child => child.chopTree()); this.children = []; }
    toArray(): LogicNode<Type, Section>[] {
        return [this, ...this.children.map(child => child.toArray()).flat()];
    }
    
    constructor(id: string, title: string, type: Type, section: Section, level: number = 0, parentNode: LogicNode<Type, Section> | null = null, children: LogicNode<Type, Section>[] = [], isExpanded: boolean = false) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.section = section;
        this.level = level;
        this.parentNode = parentNode;
        this.children = children;
        this.isExpanded = isExpanded;
    }
}
export class LogicNodeAnd<Type, Section> extends LogicNode<Type, Section> {
    constructor(id: string, title: string, type: Type, section: Section, level: number = 0, parentNode: LogicNode<Type, Section> | null = null, children: LogicNode<Type, Section>[] = [], isExpanded: boolean = false) {
        super(id, title, type, section, level, parentNode, children, isExpanded);
    }

    public evaluate(filterable: Filterable): boolean {
        return this.children.every(child => child.evaluate(filterable));
    }

    public deepCopy(): LogicNode<Type, Section> {
        return new LogicNodeAnd(this.id, this.title, this.type, this.section, this.level, this.parentNode, this.children.map(child => child.deepCopy()));
    }

}

export class LogicNodeOr<Type, Section> extends LogicNode<Type, Section> {
    constructor(id: string, title: string, type: Type, section: Section, level: number = 0, parentNode: LogicNode<Type, Section> | null = null, children: LogicNode<Type, Section>[] = [], isExpanded: boolean = false) {
        super(id, title, type, section, level, parentNode, children, isExpanded);
    }

    public evaluate(filterable: Filterable): boolean {
        return this.children.some(child => child.evaluate(filterable));
    }

    public deepCopy(): LogicNode<Type, Section> {
        return new LogicNodeOr(this.id, this.title, this.type, this.section, this.level, this.parentNode, this.children.map(child => child.deepCopy()));
    }

}

export class LogicNodeNot<Type, Section> extends LogicNode<Type, Section> {
    constructor(id: string, title: string, type: Type, section: Section, level: number = 0, parentNode: LogicNode<Type, Section> | null = null, children: LogicNode<Type, Section>[] = [], isExpanded: boolean = false) {
        super(id, title, type, section, level, parentNode, children, isExpanded);
    }

    public evaluate(filterable: Filterable): boolean {
        return !this.children.some(child => child.evaluate(filterable));
    }

    public deepCopy(): LogicNode<Type, Section> {
        return new LogicNodeNot(this.id, this.title, this.type, this.section, this.level, this.parentNode, this.children.map(child => child.deepCopy()));
    }
}


