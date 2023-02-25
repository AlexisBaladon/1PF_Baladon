import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { Filterable } from 'src/app/logic/filter/filterable';
import { FilterableDataService } from 'src/app/services/filterables/data/filterableData.service';
import { FilterableContextService } from 'src/app/services/filterables/context/filterableContext.service';
import { UsersService } from 'src/app/services/users/users.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import User from 'src/app/interfaces/user';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() public openEditDialog!: (dialog: MatDialog, mode: 'create' | 'edit', filterable?: Filterable, width?: string | undefined) => MatDialogRef<any, any>;
  @Input() public openDeleteDialog!: (dialog: MatDialog, filterableId: Filterable['id'], width?: string | undefined, filterableService?: FilterableDataService<Filterable>) =>  MatDialogRef<any, any>;
  @Output() public onViewEmiter: EventEmitter<Filterable["id"]> = new EventEmitter();
  constructor(
    public dialog: MatDialog, 
    public el: ElementRef, 
    private filterableContextService: FilterableContextService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
  ) {}
  private filterableData: Filterable[] = [];
  public filterableData$: Subscription | undefined;
  public displayedColumns: string[] = [];
  public displayedColumnData: { attribute: string; attributeName: string }[] = [];
  public displayedColumns$: Subscription | undefined;
  private filterableService!: FilterableDataService<Filterable>;
  private filterableService$!: Subscription;
  public dataSource!: MatTableDataSource<Filterable>;
  private user: User | null = null;
  private user$!: Subscription;

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

    this.filterableData$ = this.filterableService.getData(true).subscribe(filterableData => {
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

    this.user$ = this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.unsuscribeFromData();
    this.filterableService$.unsubscribe();
    this.user$.unsubscribe();
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

  public hasPermissions() {
    return this.user?.profile === 'admin';
  }

  public onEdit(filterableId: Filterable['id']) {
    const filterableData = this.filterableData.find(filterableData => filterableData.id === filterableId) ?? {} as Filterable;
    const dialogRef = this.openEditDialog(this.dialog, 'edit', filterableData, '750px');

    dialogRef.afterClosed().subscribe(result => {
      const resultData = result?.data;
      
      if (!resultData) return;
      this.filterableService.updateData(resultData);
    });
  }

  public onDelete(filterableDataId: Filterable['id']) {
    this.openDeleteDialog(this.dialog, filterableDataId, '500px', this.filterableService);
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

  public isBoolean(value: any, data?: string): boolean {
    const valueString = String(value);
    return ['true', 'false'].includes(valueString);
  }

  public isElse(value: any, att: string | undefined, surname: string | undefined): boolean {
    return !this.isDate(value) && !this.isArray(value) && !this.hasFullName(att, surname) && !this.isBoolean(value);
  }

  public arrayLength(value: any): number {
    value = String(value);
    if (value === '') return 0;
    return value.split(',').length;
  }

}
