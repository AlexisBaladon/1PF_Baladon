import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FilterOption } from 'src/app/constants/text';
import { Filterable } from 'src/app/logic/filter/filterable';
import { FilterableContextService } from 'src/app/services/filterables/context/filterableContext.service';
import { FilterableDataService } from 'src/app/services/filterables/data/filterableData.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @Input() public title!: string;
  @Input() public description!: string;
  @Input() public filterableType!: string;
  @Input() public createDataTitle!: string;
  @Input() public filterOptions!: FilterOption[];
  @Input() public icon!: string;
  @Input() public openEditDialog!: (dialog: MatDialog, mode: 'create' | 'edit', filterable?: Filterable, width?: string | undefined) => MatDialogRef<any, any>;
  @Input() public openDeleteDialog!: (dialog: MatDialog, filterableId: Filterable['id'], width?: string | undefined) => MatDialogRef<any, any>;
  @Input() public onView!: (id: string) => void;
  @Output() public onViewEmitter: EventEmitter<Filterable["id"]> = new EventEmitter();
  private filterableContextService$!: Subscription;
  private filterableDataService$!: FilterableDataService<Filterable>;

  constructor(public dialog: MatDialog, private filterableContextService: FilterableContextService) { }

  ngOnInit () {
    this.filterableContextService$ = this.filterableContextService.getService().subscribe(service => {
      this.filterableDataService$ = service;
    });
  }

  ngOnDestroy() {
    this.filterableContextService$.unsubscribe();
  }

  public handleViewEmitter(id: string) {
    this.onViewEmitter.emit(id);
  }

  public handleOpenEditDialog(mode: 'create' | 'edit', filterable?: Filterable) {
    const dialogRef = this.openEditDialog(this.dialog, mode, filterable);
    dialogRef.afterClosed().subscribe((result: {filterableData: Filterable}) => {
        const filterableData = result.filterableData;
        if (mode === 'create') this.filterableDataService$.addData(filterableData);
        else this.filterableDataService$.updateData(filterableData);
    });
  }

}
