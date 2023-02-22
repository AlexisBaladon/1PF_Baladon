import { Filterable } from "../logic/filter/filterable";

class User extends Filterable {
    email: string;
    name: string;
    surname: string;
    password: string;
    profile: 'user' | 'admin';
    direction?: string;
    phone?: string;
    pictureUrl?: string;

    getShownAttributes(): string[] {
        return ['name', 'email', 'profile'];
    }

    constructor(id: string, email: string, name: string, surname: string, password: string, profile: 'user' | 'admin', direction?: string, phone?: string, pictureUrl?: string) {
        super(id);
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.direction = direction;
        this.phone = phone;
        this.profile = profile;
        this.pictureUrl = pictureUrl;
    }
}

export default User;