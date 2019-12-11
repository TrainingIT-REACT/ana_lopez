import types from '../actions/types';

const initialState = {
  name: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        name: action.name
      };
    default:
      return state;
  }
};

export default reducer;
