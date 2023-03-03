import { Admin, User } from "src/app/models/user.model";

export interface AuthState {
    user : User | null,
    admin : Admin | null,
}

export const initialState : AuthState = {
    user: null,
    admin : null
}