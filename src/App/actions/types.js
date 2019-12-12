const actions = ['LOGIN', 'LOGOUT'];

const actionTypes = {};
actions.forEach(action => {
  actionTypes[action] = action;
});

export default actionTypes;
