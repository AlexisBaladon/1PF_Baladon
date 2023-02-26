import User from "src/app/interfaces/user";

export interface AuthState {
    user: User | null;
    currentPage: string;
    error: Error | null;
}

export interface AuthAction {
    type: AuthTypes;
    name: string;
    surname: string;
    email: string;
    password: string;
    error?: string;
}

export type AuthTypes =
    | "LOGIN"
    | "LOGIN_SUCCESS"
    | "LOGIN_FAILURE"
    | "LOGOUT"
    | "LOGOUT_SUCCESS"
    | "LOGOUT_FAILURE"
    | "REGISTER"
    | "REGISTER_SUCCESS"
    | "REGISTER_FAILURE";
