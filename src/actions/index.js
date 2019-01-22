export const setUser = (user) => {
  return {
    type: 'SET_USER',
    payload: {
      user
    }
  };
};

export const setStocks = (stocks) => {
  return {
    type: 'SET_STOCKS',
    payload: {
      stocks
    }
  };
};