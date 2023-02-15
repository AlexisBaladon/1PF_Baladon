import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterName } from 'src/app/interfaces/filters';
import { LogicFilterType, LogicFilterTypes } from '../../../../interfaces/logic-filter-type';
import { logicOperatorTitles } from 'src/app/interfaces/filter';
import { type FilterOption } from 'src/app/constants/text';

@Component({
  selector: 'app-add-filter-modal',
  templateUrl: './add-filter-modal.component.html',
  styleUrls: ['./add-filter-modal.component.scss']
})
export class AddFilterModalComponent { 
   public filters: FilterOption[] = [];
   public isOpenFilter = false;
   public values = new Map<FilterName, string>([]);

   constructor(@Inject(MAT_DIALOG_DATA) public data: {
       	type: LogicFilterType | null,
       	section?: FilterName | null,
       	value?: string,
		filters?: FilterOption[]
    } = {type: null},
    private dialogRef: MatDialogRef<AddFilterModalComponent>) { }
    
   public logicOperatorTitles = logicOperatorTitles;
   public types = LogicFilterTypes;
   public selectedType: LogicFilterType | null = null;

	ngOnInit() {
		this.filters = this.data.filters ?? [];
	}

   public switchFilter(value?: boolean) {
      this.isOpenFilter = value ?? !this.isOpenFilter;
   }

	public chooseType(type: LogicFilterType | null) {
		if (!type) return;
		this.data.type = type;
	}

	private currentFilter: FilterName | null = null;

	chooseFilter(filter: FilterOption) {
		this.currentFilter = filter.name;
	}

	onSubmit() {
		if (this.values.get(this.currentFilter!) === undefined) {
			this.values.set(this.currentFilter!, '');
		}
		this.data.value = this.values.get(this.currentFilter!)!;
		this.data.section = this.currentFilter!;
		this.dialogRef.close(this.data);
	}

	onChange(event: Event, filterName: FilterName) {
		this.chooseFilter(this.filters.find(filter => filter.name === filterName)!);
		const target = event.target as HTMLInputElement;
		this.values.set(this.currentFilter!, target.value);
	}

	isLeaf(type: LogicFilterType) {
		return type === 'LEAF';
	}

	getLeafType(): LogicFilterType {
		return 'LEAF';
	}

}