export default (user=null, action) => {
  if (action.type === 'SET_USER') {
    return action.payload.user;
  }
  return user;
};
