import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FilterOption } from 'src/app/constants/text';
import User from 'src/app/interfaces/user';
import { Filterable } from 'src/app/logic/filter/filterable';
import { AuthService } from 'src/app/services/auth/auth.service';
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
  @Input() public openEditDialog!: (dialog: MatDialog, mode: 'create' | 'edit', data?: Filterable, width?: string | undefined) => MatDialogRef<any, any>;
  @Input() public openDeleteDialog!: (dialog: MatDialog, filterableId: Filterable['id'], width?: string | undefined) => MatDialogRef<any, any>;
  @Input() public onView!: (id: string) => void;
  @Output() public onViewEmitter: EventEmitter<Filterable["id"]> = new EventEmitter();
  private filterableContextService$!: Subscription;
  private filterableDataService$!: FilterableDataService<Filterable>;
  private user$!: Subscription;
  private user: User | null = null;

  constructor(
    public dialog: MatDialog, 
    private filterableContextService: FilterableContextService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.filterableContextService$ = this.filterableContextService.getService().subscribe(service => {
      this.filterableDataService$ = service;
    });

    this.user$ = this.authService.getUser().subscribe(user => {
      this.user = user;
    });

  }

  ngOnDestroy() {
    this.filterableContextService$.unsubscribe();
  }

  public hasPermissions() {
    return this.user?.profile === 'admin';
  }

  public handleViewEmitter(id: string) {
    this.onViewEmitter.emit(id);
  }

  public handleOpenEditDialog(mode: 'create' | 'edit', filterable?: Filterable) {
    const dialogRef = this.openEditDialog(this.dialog, mode, filterable);
    dialogRef.afterClosed().subscribe((result: {data?: Filterable}) => {
        const filterableData = result?.data;
        if (!filterableData) return;
        if (mode === 'create') this.filterableDataService$.addData(filterableData);
        else this.filterableDataService$.updateData(filterableData);
    });
  }

}
