import { ArrayDataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFilterModalComponent } from '../add-filter-modal/add-filter-modal.component';
import { LogicFilterType } from '../../../../interfaces/logic-filter-type';
import { Tree } from 'src/app/logic/filter/tree';
import type { FlatNode } from '../../../../logic/filter/node';
import type { FilterName } from '../../../../interfaces/filters';
import { logicOperatorTitles } from '../../../../constants/filter';

const treeData = new Tree<LogicFilterType, FilterName>();

type FlatNodeFilter = FlatNode<LogicFilterType, FilterName>;

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  @Output() public treeEmitter = new EventEmitter<Tree<LogicFilterType, FilterName>>();

  public treeControl = new FlatTreeControl<FlatNodeFilter>(
    node => node.level,
    node => treeData.hasChildren(node),
  );

  public dataSource = new ArrayDataSource(treeData.tree);
  public treeSize = treeData.getTreeSize();

  
  private _formatValue(type: LogicFilterType, section?: string, value?: string) {
    if (type === 'LEAF' && !!section && !!value) {
      return `${section}: ${value}`;
    }    
    return `${logicOperatorTitles[type]}:`;
  }
  
  constructor(public dialog: MatDialog) {}

  public removeAllFilters() {
    treeData.chopTree();
    this.dataSource = new ArrayDataSource(treeData.tree);
  }

  public shouldRender(node: FlatNodeFilter) {
    return treeData.shouldRender(node);
  }

  public expand(node: FlatNodeFilter) {
    node.switchExpand();
  }

  public isExpandable(node: FlatNodeFilter) {
    return treeData.hasChildren(node);
  }

  public isLeaf(node: FlatNodeFilter) {
    return treeData.isLeaf(node);
  }

  public getTitle(node: FlatNodeFilter) {
    return node.name;
  }

  public getTreeSize() {
    return treeData.getTreeSize();
  }

  public openDialog(node: FlatNodeFilter | null = null) {
    const dialogRef = this.dialog.open(AddFilterModalComponent, {
      width: '500px',
      data: { type: null, section: null, value: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      treeData.addChild(
        node, 
        result.type, 
        this._formatValue(result.type, result.section, result.value),
        result.section, 
        result.value
      );
      this.dataSource = new ArrayDataSource(treeData.tree);
    });
  }

  public onFilterClick() {
    this.treeEmitter.emit(treeData.deepCopy()); 
  }

}
