import { FilterName } from "src/app/interfaces/filters";
import { LogicFilterType } from "src/app/interfaces/logic-filter-type";
import { generateId } from "src/app/utils/idGenerator";
import { LogicFilterNode, StudentGradeFilter, StudentNameFilter } from "./filter";
import { LogicNode } from "./logicNode";

export class FilterNodeFactory {
    static createNode(filterableType: string, section: FilterName, value: string | number, title: string, level: number, parent: LogicNode<LogicFilterType, FilterName> | null, isExpanded: boolean): LogicFilterNode<LogicFilterType, FilterName> {
        if (filterableType === 'Student') {
            return StudentFilterNodeFactory.createNode(section, value, title, level, parent, isExpanded);
        }
        throw new Error('Unknown filterable type');
    }
}

export class StudentFilterNodeFactory {
    static createNode(section: FilterName, value: string | number, title: string, level: number, parent: LogicNode<LogicFilterType, FilterName> | null, isExpanded: boolean): LogicFilterNode<LogicFilterType, FilterName> {
        const id = generateId();
        switch (section) {
            case 'Nombre':
                return new LogicFilterNode<LogicFilterType, FilterName>(id, title, 'LEAF', section, level, parent, [], isExpanded, 
                    new StudentNameFilter(value as string));
            case 'Promedio':
                return new LogicFilterNode<LogicFilterType, FilterName>(id, title, 'LEAF', section, level, parent, [], isExpanded, 
                    new StudentGradeFilter(value as number));
            default:
                throw new Error('Unknown filter type');
        }
    }
}