import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { UserState } from './users.types';

export const usersFeatureKey = 'users';

const initialState: UserState = {
  users: [],
  selectedUser: null,
  error: null
};

export const reducer = createReducer(
  initialState,

  on(UsersActions.getUserSuccess, (state, action) => {
    return {
      ...state,
      users: [...state.users, action.user],
      selectedUser: action.user,
      error: null
    };
  }),

  on(UsersActions.getUserFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  on(UsersActions.getUsersSuccess, (state, action) => {
    return {
      ...state,
      users: action.users,
      error: null
    };
  }),

  on(UsersActions.getUsersFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  on(UsersActions.createUsersSuccess, (state, action) => {
    return {
      ...state,
      users: [...state.users, action.user],
      error: null
    };
  }),

  on(UsersActions.createUsersFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  on(UsersActions.updateUsersSuccess, (state, action) => {
    return {
      ...state,
      users: state.users.map(user => {
        if (user.id === action.user.id) {
          return action.user;
        }
        return user;
      }),
      error: null
    };
  }),

  on(UsersActions.updateUsersFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  on(UsersActions.deleteUsersSuccess, (state, action) => {
    return {
      ...state,
      users: state.users.filter(user => user.id !== action.userId),
      error: null
    };
  }),

  on(UsersActions.deleteUsersFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  })

);
