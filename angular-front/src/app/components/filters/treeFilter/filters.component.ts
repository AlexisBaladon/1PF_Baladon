import { ArrayDataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFilterModalComponent } from '../add-filter-modal/add-filter-modal.component';
import { LogicFilterType } from '../types';

interface FlatNode {
  type: LogicFilterType;
  name: string;
  level: number;
  isExpanded?: boolean;
}

const TREE_DATA: FlatNode[] = [
];

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  public treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => this.isExpandable(node),
  );

  public dataSource = new ArrayDataSource(TREE_DATA);
  public treeSize = TREE_DATA.length;
  
  private _getParentNode(node: FlatNode) {
    const nodeIndex = TREE_DATA.indexOf(node);

    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (TREE_DATA[i].level === node.level - 1) {
        return TREE_DATA[i];
      }
    }

    return null;
  }

  public shouldRender(node: FlatNode) {
    let parent = this._getParentNode(node);
    while (parent) {
      if (!parent.isExpanded) {
        return false;
      }
      parent = this._getParentNode(parent);
    }
    return true;
  }
  
  private _formatValue(type: LogicFilterType, section?: string, value?: string) {
    if (type === 'LEAF' && !!section && !!value) {
      return `${section}: ${value}`;
    }

    const logicalOperatorTitles: { [key in LogicFilterType]: string } = {
      AND: 'Todos:',
      OR: 'Alguno:',
      NOT: 'Ninguno:',
      LEAF: 'Filtro:',
    };
    
    return logicalOperatorTitles[type];
  }

  public addChild(node: FlatNode | null, type: LogicFilterType, section?: string, value?: string) {
    if (type === 'LEAF' && (!section || !value)) {
      return;
    }
    
    let index = 0;
    let childIndex = 0;
    let level = 0;

    //root node
    if (!!node) {
      index = TREE_DATA.indexOf(node);
      childIndex = index + 1;
      level = node.level + 1;
        
      if (node.type === 'LEAF') { //node inversion
        index -= 1;
        childIndex -= 1;
        level -= 1;
        node.level += 1;
      }
    }

    TREE_DATA.splice(childIndex, 0, {
      name: this._formatValue(type, section, value), 
      level, 
      type: type, 
    });

    this.dataSource = new ArrayDataSource(TREE_DATA);
    this.treeSize = TREE_DATA.length;

    console.log('TREE_DATA', TREE_DATA);
  }

  public isExpandable(node: FlatNode) {
    //not leaf and has child
    let nodeIndex = TREE_DATA.indexOf(node);
    let nextNode = TREE_DATA[nodeIndex + 1];
    return node.type !== 'LEAF' && !!nextNode && nextNode.level > node.level;
  }

  public isExpanded(node: FlatNode) {
    return !!node.isExpanded;
  }

  public expand(node: FlatNode) {
    node.isExpanded = !node.isExpanded;
  }

  public getTitle(node: FlatNode) {
    return node.name;
  }

  public removeAllFilters() {
    TREE_DATA.splice(0, TREE_DATA.length);
    this.dataSource = new ArrayDataSource(TREE_DATA);
    this.treeSize = TREE_DATA.length;
  }

  //DIALOG
  constructor(public dialog: MatDialog) {}

  public openDialog(node: FlatNode | null = null) {
    const dialogRef = this.dialog.open(AddFilterModalComponent, {
      width: '500px',
      data: { type: null, section: null, value: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addChild(node, result.type, result.section, result.value);
    });
  }

  public isLeaf(node: FlatNode) {
    return node.type === 'LEAF';
  }

  public applyFilters() {
    console.log('applyFilters');
  }

}
