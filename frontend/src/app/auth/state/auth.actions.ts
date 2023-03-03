import { createAction, props } from "@ngrx/store";
import { Admin, User } from "src/app/models/user.model";

export const signupStart = createAction('[auth page] signup start',props<{username:string,email:string,         phoneno:number,password: string}>())
export const signupProgress = createAction('[auth page] signup progressing')
export const signupSuccess = createAction('[auth page] signup success')

export const otpSuccess = createAction('[auth page] otp start')
export const otpStart = createAction('[auth page] otp start',props<{otp : string}>())


export const loginStart = createAction('[auth page]  login start',props<{email:string,password:string}>())
export const loginSuccess = createAction('[auth page] login success',props<{user:User | null, redirect:boolean}>())


export const adminloginStart = createAction('[auth page]  admin login start',props<{email:string,password:string}>())
export const adminloginSuccess = createAction('[auth page] admin login success',props<{admin:Admin | null, redirect:boolean}>())

export const logout = createAction('[auth page] logout start')
export const logoutSuccess = createAction('[Auth] Logout Success');
