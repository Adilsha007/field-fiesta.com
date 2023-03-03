import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AuthState } from "./auth.state"

export const Auth_State_Name = 'auth'


const getAuthState = createFeatureSelector<AuthState>(Auth_State_Name)

export const isAuthenticated = createSelector(getAuthState,state => {
    return state.user ? true : false
})

export const getToken = createSelector(getAuthState,state =>{
    return state.user ? state.user.userToken : null
})