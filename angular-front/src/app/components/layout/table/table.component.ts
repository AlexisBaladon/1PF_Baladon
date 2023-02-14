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
import { UserService } from 'src/app/services/users/user.service';
import { FilterablesService } from 'src/app/services/filterables/filterables.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(public dialog: MatDialog, public el: ElementRef, private filterableDataService: FilterablesService) {}
  private students: Filterable[] = [];
  public students$: Subscription | undefined;
  public displayedColumns: string[] = [];
  public displayedColumnData: { attribute: string; attributeName: string }[] = [];
  public displayedColumns$: Subscription | undefined;
  public dataSource!: MatTableDataSource<Filterable>;
  private filterableService!: UserService<Filterable>;
  private filterableService$!: Subscription;

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

    this.students$ = this.filterableService.getFilteredStudents().subscribe(students => {
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
    this.filterableService$ = this.filterableDataService.getService().subscribe(service => {
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

  public compare(
      a: number | string | Date | null,
      b: number | string | Date | null,
        isAsc: boolean
  ) {
    if (a === null || b === null) return 0;
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  public onSortData(event: {active: string, direction: string}) {
    const sort = event.active;
    const direction = event.direction;
    this.dataSource.data = this.students.sort((a, b) => {
      const isAsc = direction === 'asc';
      if (isStudent(a) && isStudent(b)) //TODO: This is a hack, fix it
      switch (sort) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'email': return this.compare(a.email, b.email, isAsc);
        case 'career': return this.compare(a.career, b.career, isAsc);
        case 'admissionDate': return this.compare(a.admissionDate, b.admissionDate, isAsc);
        case 'averageGrade': return this.compare(a.averageGrade, b.averageGrade, isAsc);
        default: return 0;
      }
      return 0;
    });
  }

  public onEditStudent(studentId: Student['id']) {
    const student = this.students.find(student => student.id === studentId);

    const dialogRef = this.dialog.open(AddUserFormComponent, {
      width: '750px',
      data: {  student: student, valid: true, title: 'Modificar usuario' }
    });

    dialogRef.afterClosed().subscribe(result => {
      const resultStudent = result?.student;
      if (!resultStudent) return;
      this.filterableService.updateData(result.student);
    });
  }

  public onDeleteStudent(studentId: Student['id']) {
    this.dialog.open(ConfirmModalComponent, {
      width: '400px',
      data: {
        title: 'Eliminar estudiante',
        message: '¿Estás seguro de que quieres eliminar a este estudiante? Los datos perdidos no podrán recuperarse.',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        onConfirm: () => {
          this.filterableService.deleteStudent(studentId);
          this.dialog.closeAll()
        },
        onCancel: () => {
          this.dialog.closeAll()
        },
      }
    });

  }

}
