import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from './auth.types';

export const authFeatureKey = 'auth';

export const initialState: AuthState = {
  user: null,
  currentPage: 'login',
  error: null
};

export const reducer = createReducer(
  initialState,

  on(AuthActions.getUserSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      error: null
    };
  }),

  on(AuthActions.getUserFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  on(AuthActions._getError, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  on(AuthActions.setCurrentPage, (state, action) => {
    return {
      ...state,
      currentPage: action.currentPage
    };
  }),

  on(AuthActions._logout, (state) => {
    return {
      ...state,
      user: null,
      error: null
    };
  }),


);
