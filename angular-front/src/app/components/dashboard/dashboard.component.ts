import { Component } from '@angular/core';
import type { FilterName } from 'src/app/interfaces/filters';
import type { LogicFilterType } from 'src/app/interfaces/logic-filter-type';
import type { Tree } from 'src/app/logic/filter/tree';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public filters: Tree<LogicFilterType, FilterName> | undefined;

  public onTreeEmitter(tree: Tree<LogicFilterType, FilterName>) {
    this.filters = tree;
  }

}
