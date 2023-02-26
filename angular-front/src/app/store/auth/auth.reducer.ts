import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,

  on(AuthActions.authAuths, state => state),
  on(AuthActions.authAuthsSuccess, (state, action) => state),
  on(AuthActions.authAuthsFailure, (state, action) => state),

);
