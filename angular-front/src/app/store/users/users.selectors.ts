import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './users.types';

export const selectUsersState = createFeatureSelector<fromUsers.UserState>('users');

export const selectUsers = createSelector(
  selectUsersState,
  (state: fromUsers.UserState) => state.users
);

export const selectUsersError = createSelector(
  selectUsersState,
  (state: fromUsers.UserState) => state.error
);

export const selectUser = createSelector(
  selectUsersState,
  (state: fromUsers.UserState) => state.selectedUser
);

