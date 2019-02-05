import {setUser, setStocks, setDateRange, fetchCurrentPrice} from 'actions';

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

describe('setStocks', () => {
  it ('has the correct type', () => {
    const action = setStocks();
    expect(action.type).toEqual('SET_STOCKS');
  });

  it ('has the correct payload', () => {
    const action = setStocks('FB');
    expect(action.payload.stocks).toEqual('FB');
  });
});

describe('setDateRange', () => {
  it ('has the correct type', () => {
    const action = setDateRange();
    expect(action.type).toEqual('SET_DATE_RANGE');
  });

  it ('has the correct payload', () => {
    const fromDate = '01-01-2019';
    const toDate = '02-01-2019';
    const action = setDateRange(fromDate, toDate);
    expect(action.payload.fromDate).toEqual(fromDate);
    expect(action.payload.toDate).toEqual(toDate);
  });
});



//TODO
//fetchCurrentPrice

//fetchCompany

//fetchDatePrice

