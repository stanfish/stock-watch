import stockReducer from 'reducers/stockReducer';
const stocks = 'FB';
it ('handles SET_STOCKS action', () => {
  const action = {
    type: 'SET_STOCKS',
    payload: {
      stocks,
    }
  };
  const newState = stockReducer([], action);
  expect (newState).toEqual(stocks);
});

it ('handles unknown action', () => {
  const action = {
    type: 'UNKNOWN',
    payload: {
      stocks,
    }
  };
  const newState = stockReducer([], action);
  expect (newState).toEqual([]);
});
