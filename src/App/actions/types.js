const actions = [
  'LOGIN',
  'LOGOUT',
  'RECOMMENDATIONS_LOADING',
  'RECOMMENDATIONS_ERROR',
  'RECOMMENDATIONS_LOADED',
  'ALBUMS_LOADING',
  'ALBUMS_ERROR',
  'ALBUMS_LOADED'
];

const actionTypes = {};
actions.forEach(action => {
  actionTypes[action] = action;
});

export default actionTypes;
