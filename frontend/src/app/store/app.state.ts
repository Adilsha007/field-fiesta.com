import { authReducer } from "../auth/state/auth.reducer";
import { Auth_State_Name } from "../auth/state/auth.selector";
import { AuthState } from "../auth/state/auth.state";

export interface AppState {
    [Auth_State_Name] : AuthState
}


export const AppReducer = {
    [Auth_State_Name] : authReducer
}