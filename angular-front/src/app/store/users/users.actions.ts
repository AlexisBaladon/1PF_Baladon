import { createAction, props } from '@ngrx/store';
import User from 'src/app/interfaces/user';

export const createUsers = createAction(
  'ADD_USER',
  (user: User) => ({ user })
);

export const createUsersSuccess = createAction(
  'ADD_USER_SUCCESS',
  (user: User) => ({ user })
);

export const createUsersFailure = createAction(
  'ADD_USER_FAILURE',
  (error: string) => ({ error })
);

export const updateUsers = createAction(
  'UPDATE_USER',
  (user: User) => ({ user })
);

export const updateUsersSuccess = createAction(
  'UPDATE_USER_SUCCESS',
  (user: User) => ({ user })
);

export const updateUsersFailure = createAction(
  'UPDATE_USER_FAILURE',
  (error: string) => ({ error })
);

export const deleteUsers = createAction(
  'DELETE_USER',
  (userId: User['id']) => ({ userId })
  );
  
export const deleteUsersSuccess = createAction(
  'DELETE_USER_SUCCESS',
  (userId: User['id']) => ({ userId })
  );
  
export const deleteUsersFailure = createAction(
  'DELETE_USER_FAILURE',
  (error: string) => ({ error })
);

export const getUsers = createAction('GET_USERS');

export const getUsersSuccess = createAction(
  'GET_USERS_SUCCESS',
  (users: User[]) => ({ users })
);

export const getUsersFailure = createAction(
  'GET_USERS_FAILURE',
  (error: string) => ({ error })
);

export const getUser = createAction(
  'GET_USER',
  (userId: User['id']) => ({ userId })
);

export const getUserSuccess = createAction(
  'GET_USER_SUCCESS',
  (user: User) => ({ user })
);

export const getUserFailure = createAction(
  'GET_USER_FAILURE',
  (error: string) => ({ error })
);