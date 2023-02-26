import User from "src/app/interfaces/user";

export interface UserState {
    users: User[];
    selectedUser: User | null;
    error: string | null;
}

export interface UserAction {
    type: UserTypes;
    userId: User["id"];
    user: User;
    willFilter: boolean;
    users: User[];
    error?: string;
}

export type UserTypes =
    | "GET_USERS"
    | "ADD_USER"
    | "UPDATE_USER"
    | "DELETE_USER"
