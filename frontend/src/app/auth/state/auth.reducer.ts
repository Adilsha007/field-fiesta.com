import { createReducer, on } from "@ngrx/store";
import { adminloginSuccess, logout, loginSuccess, signupSuccess } from "./auth.actions";
import { initialState } from "./auth.state";

export const authReducer = createReducer(
    initialState,
    on(signupSuccess,(state, action)=>{
    
        return {
            ...state,
            user: null
        }
    }),
    on(loginSuccess,(state, action)=>{

        return {
            ...state,
            user : action.user
        }
    }),
    on(adminloginSuccess,(state, action)=>{

        return {
            ...state,
            admin : action.admin
        }
    }),
    on(logout,(state,action)=>{
        return {
            ...state,
            user: null
        }
    })
)