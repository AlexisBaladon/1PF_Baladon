import { createAction } from '@ngrx/store';
import User from 'src/app/interfaces/user';

export const login = createAction(
  'LOGIN',
  (email: string, password: string) => ({ email, password })
);

export const _login = createAction(
  '_LOGIN',
);

export const logout = createAction(
  'LOGOUT',
);

export const _logout = createAction(
  '_LOGOUT',
);

export const register = createAction(
  'REGISTER',
  (name: string, surname: string, email: string, password: string) => ({ name, surname, email, password })
);

export const _register = createAction(
  '_REGISTER',
);

export const getUser = createAction(
  'GET_USER',
);
  
export const getUserSuccess = createAction(
  'GET_USER_SUCCESS',
  (user: User) => ({user})
);

export const getUserFailure = createAction(
  'GET_USER_FAILURE',
  (error: any) => ({error})
);

export const getError = createAction(
  'GET_ERROR',
);

export const _getError = createAction(
  '_GET_ERROR',
  (error: Error | null) => ({error})
);

export const setCurrentPage = createAction(
  'SET_CURRENT_PAGE',
  (currentPage: string) => ({currentPage})
);
