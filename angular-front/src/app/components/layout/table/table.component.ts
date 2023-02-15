import { Component, ElementRef, ViewChild } from '@angular/core';
import Student, { isStudent } from 'src/app/interfaces/student';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../global/confirm-modal/confirm-modal.component';
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
  constructor(public dialog: MatDialog, public el: ElementRef, private filterableContextService: FilterableContextService) {}
  private students: Filterable[] = [];
  public students$: Subscription | undefined;
  public displayedColumns: string[] = [];
  public displayedColumnData: { attribute: string; attributeName: string }[] = [];
  public displayedColumns$: Subscription | undefined;
  private filterableService!: FilterableDataService<Filterable>;
  private filterableService$!: Subscription;
  public filterablePromise!: Promise<Filterable>;
  public dataSource!: MatTableDataSource<Filterable>;

  private restartTable() {
    this.dataSource = new MatTableDataSource(this.students);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private unsuscribeFromData() {
    if (this.students$ !== undefined) this.students$.unsubscribe();
    if (this.displayedColumns$ !== undefined) this.displayedColumns$.unsubscribe();
  }

  private filterableSuscription() {
    this.unsuscribeFromData();

    this.students$ = this.filterableService.getFilteredData().subscribe(students => {
      this.students = students;
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

  public onViewStudent(filterableId: Partial<Filterable['id']>) {
    this.filterablePromise = this.filterableService.getById(filterableId);
  }

  public onEditStudent(filterableId: Partial<Filterable['id']>) {
    const student = this.students.find(student => student.id === filterableId) ?? {};
    const dialogRef = this.filterableService.openEditDialog(this.dialog, 'edit', student, '750px');

    dialogRef.afterClosed().subscribe(result => {
      const resultStudent = result?.student;
      
      if (!resultStudent) return;
      this.filterableService.updateData(resultStudent);
    });
  }

  public onDeleteStudent(studentId: Student['id']) {
    this.filterableService.openDeleteDialog(this.dialog, studentId);  
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
