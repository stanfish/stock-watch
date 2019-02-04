export default (stocks=[], action) => {
  if (action.type === 'SET_STOCKS') {
    return action.payload.stocks;
  }
  return stocks;
};
