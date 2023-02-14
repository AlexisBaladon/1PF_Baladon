import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import Student from 'src/app/interfaces/student';
import { FilterOption } from 'src/app/constants/text';
import { FilterablesService } from 'src/app/services/filterables/filterables.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/users/user.service';
import { Filterable } from 'src/app/logic/filter/filterable';
import { AddCourseFormComponent } from '../add-course-form-component/add-course-form-component/add-course-form.component';

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
  constructor(public dialog: MatDialog, public filterableDataService: FilterablesService) {}
  private filterableService$!: Subscription;
  private filterableService!: UserService<any>;

  ngOnInit() {
    this.filterableService$ = this.filterableDataService.getService().subscribe((service) => {
      this.filterableService = service;
    });
  }

  ngOnDestroy() {
    this.filterableService$.unsubscribe();
  }

  public openDialog() {
    const dialogRef = this.filterableService.openEditDialog(this.dialog, 'create', {}, '600px');
    dialogRef.afterClosed().subscribe(result => {
      const resultFilterable: Filterable | undefined = result?.student;
      if (!resultFilterable) return;
      this.filterableService.addData(resultFilterable);
    });
  }

}
