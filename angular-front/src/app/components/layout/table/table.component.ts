import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { Filterable } from 'src/app/logic/filter/filterable';
import { FilterableDataService } from 'src/app/services/filterables/data/filterableData.service';
import { FilterableContextService } from 'src/app/services/filterables/context/filterableContext.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() public onViewEmiter: EventEmitter<Filterable["id"]> = new EventEmitter();
  constructor(public dialog: MatDialog, public el: ElementRef, private filterableContextService: FilterableContextService) {}
  private filterableData: Filterable[] = [];
  public filterableData$: Subscription | undefined;
  public displayedColumns: string[] = [];
  public displayedColumnData: { attribute: string; attributeName: string }[] = [];
  public displayedColumns$: Subscription | undefined;
  private filterableService!: FilterableDataService<Filterable>;
  private filterableService$!: Subscription;
  public dataSource!: MatTableDataSource<Filterable>;

  private restartTable() {
    this.dataSource = new MatTableDataSource(this.filterableData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private unsuscribeFromData() {
    if (this.filterableData$ !== undefined) this.filterableData$.unsubscribe();
    if (this.displayedColumns$ !== undefined) this.displayedColumns$.unsubscribe();
  }

  private filterableSuscription() {
    this.unsuscribeFromData();

    this.filterableData$ = this.filterableService.getFilteredData().subscribe(filterableData => {
      this.filterableData = filterableData;
      this.restartTable();
    });
    this.displayedColumns$ = this.filterableService.getFilterableAttributes().subscribe(attributes => {
      this.displayedColumnData = attributes;
      this.displayedColumns = attributes.map(a => a.attribute).concat(['actions']);
      this.restartTable();
    });
  }

  ngOnInit() { 
    this.filterableService$ = this.filterableContextService.getService().subscribe(service => {
      this.filterableService = service;
      this.filterableSuscription()
    });
  }

  ngOnDestroy() {
    this.unsuscribeFromData();
    this.filterableService$.unsubscribe();
  }

  ngAfterViewInit() { 
    this.restartTable();
    this.el.nativeElement
    .querySelectorAll('.mat-sort-header-arrow')
    .forEach((arrow: any) => (arrow.style.color = 'white'));
  }

  public onView(filterableId: Filterable['id']) {
    this.onViewEmiter.emit(filterableId);
  }

  public onEdit(filterableId: Partial<Filterable['id']>) {
    const filterableData = this.filterableData.find(filterableData => filterableData.id === filterableId) ?? {};
    const dialogRef = this.filterableService.openEditDialog(this.dialog, 'edit', filterableData, '750px');

    dialogRef.afterClosed().subscribe(result => {
      const resultData = result?.filterableData;
      
      if (!resultData) return;
      this.filterableService.updateData(resultData);
    });
  }

  public onDelete(filterableDataId: Filterable['id']) {
    this.filterableService.openDeleteDialog(this.dialog, filterableDataId);  
  }
  
  public isDate(value: any): boolean {
    return RegExp(/\d{4}-\d{2}-\d{2}/).test(value);
  }

  public hasFullName(attribute: string | undefined, surname: string | undefined): boolean {
    return (attribute === 'name' && surname !== undefined);
  }

  public isArray(value: any): boolean {
    return Array.isArray(value);
  }

  public isElse(value: any, att: string | undefined, surname: string | undefined): boolean {
    return !this.isDate(value) && !this.isArray(value) && !this.hasFullName(att, surname);
  }

  public arrayLength(value: any): number {
    value = String(value);
    if (value === '') return 0;
    return value.split(',').length;
  }

}
