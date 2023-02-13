import { Pipe, PipeTransform } from '@angular/core';
import { Filterable } from 'src/app/logic/filter/filterable';
import { LogicNode } from 'src/app/logic/filter/logicNode';
import { FilterName } from '../../interfaces/filters';
import { LogicFilterType } from '../../interfaces/logic-filter-type';

type FlatNodeFilter = LogicNode<LogicFilterType, FilterName>;
type FlatNodeLeaf = LogicNode<'LEAF', FilterName>;

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
	public transform(filterableData: Filterable[] | null, filters: FlatNodeFilter | null): Filterable[] {
		if (!filterableData) return [];
		if (filters === null) return filterableData;
		return filterableData.filter((filterable: Filterable) => {
			return filters.evaluate(filterable);
		});
	}

}
