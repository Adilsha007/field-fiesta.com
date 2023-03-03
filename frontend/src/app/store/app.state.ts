import { authReducer } from "../auth/state/auth.reducer";
import { Auth_State_Name } from "../auth/state/auth.selector";
import { AuthState } from "../auth/state/auth.state";
import { sharedReducer } from "./shared/shared.reducer";
import { shared_state_name } from "./shared/shared.selector";
import { SharedState } from "./shared/shared.state";

export interface AppState {
    [Auth_State_Name] : AuthState,
    [shared_state_name]: SharedState
}


export const AppReducer = {
    [Auth_State_Name] : authReducer,
    [shared_state_name]: sharedReducer
}