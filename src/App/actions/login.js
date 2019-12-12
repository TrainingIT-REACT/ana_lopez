import types from './types';

export const login = (name, password) => ({
  type: types.LOGIN,
  name,
  password
});

export const logout = () => ({
  type: types.LOGOUT
});
