export abstract class Filterable {
    id: string;
    abstract getShownAttributes(): (string)[];

    constructor(id: string) {
        this.id = id;
    }
};