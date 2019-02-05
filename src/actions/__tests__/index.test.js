import {setUser, setStocks, setDateRange, fetchCurrentPrice} from 'actions';
import {mockStore} from 'testUtil/mockStore';
import {getAction} from 'testUtil/getAction';

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

describe('fetchCurrentPrice', () => {
  it("has the correct type", async () => {
    const store = mockStore();
    const action = { type: 'FETCH_CURRENT_PRICE', payload: {} }
    store.dispatch(action);
    const resultAction = await getAction(store, "FETCH_CURRENT_PRICE");
    expect(resultAction.type).toEqual("FETCH_CURRENT_PRICE");
  });

  it("has the correct payload", async () => {
    const store = mockStore();
    const price = 123;
    const stock = 'FB';
    const action = { type: 'FETCH_CURRENT_PRICE', payload: { stock, price} }
    store.dispatch(action);
    const resultAction = await getAction(store, "FETCH_CURRENT_PRICE");
    expect(resultAction.payload.price).toEqual(price);
    expect(resultAction.payload.stock).toEqual(stock);
  });


  //TODO test axios
});

//TODO

//fetchCompany

//fetchDatePrice

