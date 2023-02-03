export class FlatNode<Type, Section> {
    private _type: Type;
    private _name: string = '';
    private _level: number;
    private _isExpanded?: boolean;
    private _section?: Section;
    private _value?: string;

    constructor(type: Type, name: string, level: number, isExpanded?: boolean, section?: Section, value?: string) {
        this._type = type;
        this._name = name;
        this._level = level;
        this._isExpanded = isExpanded;
        this._section = section;
        this._value = value;
    }
        
    //Out of tree
    public get isExpanded(): boolean {
        return !!this._isExpanded;
    }

    public set isExpanded(expanded: boolean) {
        this._isExpanded = expanded;
    }

    public switchExpand() {
        this._isExpanded = !this._isExpanded;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get type(): Type {
        return this._type;
    }

    public set type(type: Type) {
        this._type = type;
    }

    public get level(): number {
        return this._level;
    }

    public set level(level: number) {
        this._level = level;
    }

    public get section(): Section | undefined {
        return this._section;
    }

    public set section(section: Section | undefined) {
        this._section = section;
    }

    public get value(): string {
        return this._value || '';
    }

    public set value(value: string) {
        this._value = value;
    }

    public copy(): FlatNode<Type, Section> {
        return new FlatNode<Type,Section>(
            this.type,
            this.name,
            this.level,
            this.isExpanded,
            this.section,
            this.value,
          );
    }

}