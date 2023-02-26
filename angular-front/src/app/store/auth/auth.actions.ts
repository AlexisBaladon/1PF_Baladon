import { createAction, props } from '@ngrx/store';

export const authAuths = createAction(
  '[Auth] Auth Auths'
);

export const authAuthsSuccess = createAction(
  '[Auth] Auth Auths Success',
  props<{ data: any }>()
);

export const authAuthsFailure = createAction(
  '[Auth] Auth Auths Failure',
  props<{ error: any }>()
);
