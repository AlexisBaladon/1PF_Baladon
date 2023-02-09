import { FlatNode } from './node';

export class Tree<NodeType, Section> {
    private _tree: FlatNode<NodeType, Section>[] = [];

    public get tree() {
        return this._tree;
    }

    public deepCopy() {
        let newTree = new Tree<NodeType, Section>();
        newTree._tree = this._tree.map(node => node.copy());
        return newTree;
    }

    public isLeafType(type: NodeType) {
        return type === 'LEAF';
    }

    private _getParentNode(node: FlatNode<NodeType,Section>) {
      const nodeIndex = this._tree.indexOf(node);

      for (let i = nodeIndex - 1; i >= 0; i--) {
        if (this._tree[i].level === node.level - 1) {
          return this._tree[i];
        }
      }

      return null;
    }

    public addChild(node: FlatNode<NodeType,Section> | null, type: NodeType, name: string, section?: Section, value?: string) {
      if (this.isLeafType(type) && (!section || !value)) return;
	  
      let index = 0;
      let childIndex = 0;
      let level = 0;
      let newChild: FlatNode<NodeType,Section>;
      
      //root node
      if (!!node) {
        if (this.isLeaf(node)) return;
        index = this._tree.indexOf(node);
        childIndex = index + 1;
        level = node.level + 1;    
      }

      newChild = new FlatNode(type, name, level, false, section, value??'');

      this._tree.splice(childIndex, 0, newChild);
    }

    public getTreeSize() {
      return this._tree.length;
    }

    public hasChildren(node: FlatNode<NodeType,Section>) {
      //not leaf and has child
      let nodeIndex = this._tree.indexOf(node);
      let nextNode = this._tree[nodeIndex + 1];
      return !this.isLeaf(node) && !!nextNode && nextNode.level > node.level;
    }

    public chopTree() {
      	this._tree.splice(0, this._tree.length);
    }

    public isLeaf(node: FlatNode<NodeType,Section>) {
      	return this.isLeafType(node.type);
    }

    public getChildren(node: FlatNode<NodeType,Section>): FlatNode<NodeType,Section>[] {
		let nodeIndex = this._tree.indexOf(node);
    const children: FlatNode<NodeType,Section>[] = [];
		
    for (let i = nodeIndex + 1; i < this._tree.length && this._tree[i].level >= node.level + 1; i++) {
      if (this._tree[i].level === node.level + 1) {
        children.push(this._tree[i]);
      }
    }

		return children;
    }
    
    public shouldRender(node: FlatNode<NodeType,Section>) {
		let parent = this._getParentNode(node);
		while (parent) {
			if (!parent.isExpanded) {
			return false;
			}
			parent = this._getParentNode(parent);
		}
		return true;
    }
}