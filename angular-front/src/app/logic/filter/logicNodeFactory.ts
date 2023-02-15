import { FilterName } from 'src/app/interfaces/filters';
import { LogicFilterType } from 'src/app/interfaces/logic-filter-type';
import { generateId } from 'src/app/utils/idGenerator';
import { FilterNodeFactory } from './filterNodeFactory';
import { LogicNode, LogicNodeAnd, LogicNodeNot, LogicNodeOr } from './logicNode';

export class LogicNodeFactory {
    public static createNode(filterableType: string, nodeType: LogicFilterType, section: FilterName, value: string | number, title: string, parent: LogicNode<LogicFilterType, FilterName> | null): LogicNode<LogicFilterType, FilterName> {
        const newId = generateId();
        const level = parent !== null ? parent.level + 1 : 0;
        const isExpanded = false;
        switch (nodeType) {
            case 'AND':
                return new LogicNodeAnd(newId, title, nodeType, section, level, parent, [], isExpanded)
            case 'OR':
                return new LogicNodeOr(newId, title, nodeType, section, level, parent, [], isExpanded)
            case 'NOT':
                return new LogicNodeNot(newId, title, nodeType, section, level, parent, [], isExpanded)
            case 'LEAF':
                return FilterNodeFactory.createNode(filterableType, section, value, title, level, parent, isExpanded);
            default:
                return FilterNodeFactory.createNode(filterableType, section, value, title, level, parent, isExpanded);
        }
    }
}