export abstract class Filterable {
    id: string;
    abstract getShownAttributes(): string[];
    abstract constructorName(): string;

    constructor(id: string) {
        this.id = id;
    }
};