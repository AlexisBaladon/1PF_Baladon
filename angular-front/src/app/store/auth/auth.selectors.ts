import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.types';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>('auth');

export const selectLoggedUser = createSelector(
  selectAuthState,
  (state: fromAuth.AuthState) => state.user
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: fromAuth.AuthState) => state.error
);

export const selectCurrentPage = createSelector(
  selectAuthState,
  (state: fromAuth.AuthState) => state.currentPage
);


