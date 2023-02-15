import { FilterName } from "src/app/interfaces/filters";
import { LogicFilterType } from "src/app/interfaces/logic-filter-type";
import { generateId } from "src/app/utils/idGenerator";
import { StudentGradeFilter, StudentNameFilter } from "./studentFilter";
import { LogicFilterNode } from "./filter";
import { LogicNode } from "./logicNode";
import { CourseAmountFilter, CourseNameFilter } from "./courseFilter";

export class FilterNodeFactory {
    static createNode(filterableType: string, section: FilterName, value: string | number, title: string, level: number, parent: LogicNode<LogicFilterType, FilterName> | null, isExpanded: boolean): LogicFilterNode<LogicFilterType, FilterName> {
        if (filterableType === 'Student') {
            return StudentFilterNodeFactory.createNode(section, value, title, level, parent, isExpanded);
        }
        else if (filterableType === 'Course') {
            return CourseFilterNodeFactory.createNode(section, value, title, level, parent, isExpanded);
        }
        else {
            return StudentFilterNodeFactory.createNode(section, value, title, level, parent, isExpanded);
        }
    }
}

class StudentFilterNodeFactory {
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
                return new LogicFilterNode<LogicFilterType, FilterName>(id, title, 'LEAF', section, level, parent, [], isExpanded, 
                    new StudentNameFilter(value as string));
        }
    }
}

class CourseFilterNodeFactory {
    static createNode(section: FilterName, value: string | number, title: string, level: number, parent: LogicNode<LogicFilterType, FilterName> | null, isExpanded: boolean): LogicFilterNode<LogicFilterType, FilterName> {
        const id = generateId();
        switch (section) {
            case 'Nombre':
                return new LogicFilterNode<LogicFilterType, FilterName>(id, title, 'LEAF', section, level, parent, [], isExpanded, 
                    new CourseNameFilter(value as string));
            case 'Cantidad de alumnos':
                return new LogicFilterNode<LogicFilterType, FilterName>(id, title, 'LEAF', section, level, parent, [], isExpanded, 
                    new CourseAmountFilter(value as number));
            default:
                return new LogicFilterNode<LogicFilterType, FilterName>(id, title, 'LEAF', section, level, parent, [], isExpanded,
                    new CourseNameFilter(value as string));
        }
    }
}

