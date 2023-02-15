import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterOption } from 'src/app/constants/text';
import { FilterableStateService } from 'src/app/services/filterables/filterableState.service';
import { Subscription } from 'rxjs';
import { FilterableDataService } from 'src/app/services/users/user.service';
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
  constructor(public dialog: MatDialog, public filterableStateService: FilterableStateService) {}
  private filterableService$!: Subscription;
  private filterableService!: FilterableDataService<any>;

  ngOnInit() {
    this.filterableService$ = this.filterableStateService.getService().subscribe((service) => {
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
