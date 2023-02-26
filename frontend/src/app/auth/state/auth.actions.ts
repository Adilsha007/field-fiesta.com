import { createAction, props } from "@ngrx/store/public_api";

export const signupStart = createAction('[auth page] signup start',props<{username:string,email:string,         phoneno:number,password:string}>())