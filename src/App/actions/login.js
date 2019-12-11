import types from './types';

export const login = (name, password) => ({
  type: types.LOGIN,
  name,
  password
});
