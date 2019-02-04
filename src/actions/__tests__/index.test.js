import {setUser} from 'actions';

describe('setUser', () => {
  it ('has the correct type', () => {
    const action = setUser();
    expect(action.type).toEqual('SET_USER');
  });

  it ('has the correct payload', () => {
    const action = setUser('new user');
    expect(action.payload.user).toEqual('new user');
  });
});

