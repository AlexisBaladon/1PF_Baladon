import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import Student from 'src/app/interfaces/student';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../global/confirm-modal/confirm-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() public students!: Student[];
  @Output() public onStudentUpdate = new EventEmitter<Partial<Student>>();
  @Output() public onStudentDelete = new EventEmitter<Student['id']>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, public el: ElementRef) {}
  public displayedColumns: string[] = ['id', 'name', 'email', 'career', 'admissionDate', 'averageGrade', 'actions'];
  public dataSource!: MatTableDataSource<Student>;

  ngOnChanges() {
    this.restartTable();
  }

  private restartTable() {
    this.dataSource = new MatTableDataSource(this.students);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
      switch (sort) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'email': return this.compare(a.email, b.email, isAsc);
        case 'career': return this.compare(a.career, b.career, isAsc);
        case 'admissionDate': return this.compare(a.admissionDate, b.admissionDate, isAsc);
        case 'averageGrade': return this.compare(a.averageGrade, b.averageGrade, isAsc);
        default: return 0;
      }
    });
  }

  public onEditStudent(studentId: Student['id']) {
    const student = this.students.find(student => student.id === studentId);

    const dialogRef = this.dialog.open(AddUserFormComponent, {
      width: '750px',
      data: {  student: student, valid: true, title: 'Modificar usuario' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !result.valid) return;
      this.onStudentUpdate.emit(result.student);
    });
  }

  public onDeleteStudent(studentId: Student['id']) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '400px',
      data: {
        title: 'Eliminar estudiante',
        message: '¿Estás seguro de que quieres eliminar a este estudiante? Los datos perdidos no podrán recuperarse.',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        onConfirm: () => {
          this.onStudentDelete.emit(studentId);
          this.dialog.closeAll()
        },
        onCancel: () => {
          this.dialog.closeAll()
        },
      }
    });

  }

}
