import { createReducer, on } from "@ngrx/store";
import { setErrorMessage } from "./shared.actions";
import { initialState } from "./shared.state";

export const sharedReducer = createReducer(
    initialState,
    on(setErrorMessage,(state,action)=>{
        return {
            ...state,
            errorMessage : action.message
        }
    })
)