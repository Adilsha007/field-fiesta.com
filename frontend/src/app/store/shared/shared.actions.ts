import { createAction, props } from "@ngrx/store";

export const setErrorMessage = createAction('[shared state] set error message',props<{message: string}>())