import userReducer from 'reducers/userReducer';
const user = {name: 'NEW USER'};
it ('handles SET_STOCKS action', () => {
  const action = {
    type: 'SET_USER',
    payload: {
      user,
    }
  };
  const newState = userReducer([], action);
  expect (newState).toEqual(user);
});

it ('handles unknown action', () => {
  const action = {
    type: 'UNKNOWN',
    payload: {
      user,
    }
  };
  const newState = userReducer([], action);
  expect (newState).toEqual([]);
});
