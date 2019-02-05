import stockMapReducer from 'reducers/stockMapReducer';
const stock = 'FB';
const company = 'Facebook';
const price = 123;
it ('handles FETCH_CURRENT_PRICE action', () => {
  const action = {
    type: 'FETCH_CURRENT_PRICE',
    payload: {
      stock,
      price,
    }
  };
  const newState = stockMapReducer({}, action);
  expect (newState[stock].currentPrice).toEqual(price);
});

it ('handles FETCH_COMPANY action', () => {
  const action = {
    type: 'FETCH_COMPANY',
    payload: {
      stock,
      company,
    }
  };
  const newState = stockMapReducer({}, action);
  expect (newState[stock].company).toEqual(company);
});


it ('handles FETCH_DATE_PRICE action for fromDate', () => {
  const isFrom = true;
  const action = {
    type: 'FETCH_DATE_PRICE',
    payload: {
      stock,
      isFrom,
      price,
    }
  };
  const newState = stockMapReducer({}, action);
  expect (newState[stock].fromPrice).toEqual(price);
});

it ('handles FETCH_DATE_PRICE action for toDate', () => {
  const isFrom = false;
  const action = {
    type: 'FETCH_DATE_PRICE',
    payload: {
      stock,
      isFrom,
      price,
    }
  };
  const newState = stockMapReducer({}, action);
  expect (newState[stock].toPrice).toEqual(price);
});


it ('handles FETCH_DATE_PRICE action for n/a price when currentPrice exists', () => {
  const isFrom = false;
  const naPrice = null;
  const currentPrice = 456;
  const action = {
    type: 'FETCH_DATE_PRICE',
    payload: {
      stock,
      isFrom,
      price: naPrice,
    }
  };
  const newState = stockMapReducer({FB: {currentPrice}}, action);
  expect (newState[stock].toPrice).toEqual(currentPrice);
});


it ('handles FETCH_DATE_PRICE action for n/a price when currentPrice does not exist', () => {
  const isFrom = false;
  const naPrice = null;
  const action = {
    type: 'FETCH_DATE_PRICE',
    payload: {
      stock,
      isFrom,
      price: naPrice,
    }
  };
  const newState = stockMapReducer({}, action);
  expect (newState[stock].toPrice).toEqual(undefined);
});


it ('handles FETCH_DATE_PRICE action with calculation of change percentage with predefined fromPrice', () => {
  const isFrom = false;
  const predefinedFromPrice = 222;
  const action = {
    type: 'FETCH_DATE_PRICE',
    payload: {
      stock,
      isFrom,
      price,
    }
  };
  const newState = stockMapReducer({FB: {fromPrice: predefinedFromPrice}}, action);
  const expectedPercent = Math.round((price - predefinedFromPrice) / predefinedFromPrice * 100 * 1000) / 1000;
  expect (newState[stock].percent).toEqual(expectedPercent);
});

it ('handles FETCH_DATE_PRICE action with calculation of change percentage with predefined toPrice', () => {
  const isFrom = true;
  const predefinedToPrice = 222;
  const action = {
    type: 'FETCH_DATE_PRICE',
    payload: {
      stock,
      isFrom,
      price,
    }
  };
  const newState = stockMapReducer({FB: {toPrice: predefinedToPrice}}, action);
  const expectedPercent = Math.round((predefinedToPrice - price) / price * 100 * 1000) / 1000;
  expect (newState[stock].percent).toEqual(expectedPercent);
});

it ('handles unknown action', () => {
  const action = {
    type: 'UNKNOWN',
    payload: {}
  };
  const newState = stockMapReducer({}, action);
  expect (newState).toEqual({});
});
