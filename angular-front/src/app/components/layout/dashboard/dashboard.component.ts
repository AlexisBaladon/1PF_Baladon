import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterOption } from 'src/app/constants/text';
import { FilterableContextService } from 'src/app/services/filterables/context/filterableContext.service';
import { Subscription } from 'rxjs';
import { FilterableDataService } from 'src/app/services/filterables/data/filterableData.service';
import { Filterable } from 'src/app/logic/filter/filterable';

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
  @Output() public onViewEmitter: EventEmitter<Filterable["id"]> = new EventEmitter();
  constructor(public dialog: MatDialog, public filterableContextService: FilterableContextService) {}
  private filterableService$!: Subscription;
  private filterableService!: FilterableDataService<any>;
  
  ngOnInit() {
    this.filterableService$ = this.filterableContextService.getService().subscribe((service) => {
      this.filterableService = service;
    });
  }

  ngOnDestroy() {
    this.filterableService$.unsubscribe();
  }

  public openDialog() {
    const dialogRef = this.filterableService.openEditDialog(this.dialog, 'create', {}, '600px');
    dialogRef.afterClosed().subscribe(result => {
      const resultFilterable: Filterable | undefined = result?.filterableData;
      if (!resultFilterable) return;
      this.filterableService.addData(resultFilterable);
    });
  }

  public handleViewEmitter(id: string) {
    this.onViewEmitter.emit(id);
  }
}
