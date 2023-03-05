import type User from "src/app/interfaces/user";
import { isUser } from "src/app/interfaces/user";
import { Filter } from "./filter";
import { Filterable } from "./filterable";


export abstract class UserFilter extends Filter {
    isValidType(filterable: Filterable): boolean {
        return isUser(filterable);
    }
}

export class UserNameFilter extends UserFilter {
    private name: string;
    
    constructor(name: string) {
        super();
        this.name = name;
    }

    public evaluate(filterable: Filterable): boolean {
        return this.isValidType(filterable) && 
        (filterable as User).name.toLowerCase().includes(this.name.trim().toLowerCase());
    }
}

export class UserEmailFilter extends UserFilter {
    private email: string;
    
    constructor(email: string) {
        super();
        this.email = email;
    }

    public evaluate(filterable: Filterable): boolean {
        return this.isValidType(filterable) && 
        (filterable as User).email.toLowerCase().includes(this.email.trim().toLowerCase());
    }
}