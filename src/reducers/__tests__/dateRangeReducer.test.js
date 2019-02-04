import dateRangeReducer from 'reducers/dateRangeReducer';

it ('handles SET_DATE_RANGE action', () => {
  const fromDate = '01-01-2011';
  const toDate = '01-01-2012';
  const action = {
    type: 'SET_DATE_RANGE',
    payload: {
      fromDate,
      toDate,
    }
  };
  const newState = dateRangeReducer([], action);
  expect (newState.fromDate).toEqual(fromDate);
  expect (newState.toDate).toEqual(toDate);
});

it ('handles unknown action', () => {
  const action = {
    type: 'UNKNOWN',
    payload: {}
  };
  const newState = dateRangeReducer([], action);
  expect (newState).toEqual([]);
});
