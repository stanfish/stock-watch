import axios from 'axios';

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

export const fetchCurrentPrice = sym => async dispatch => {
  let responsePrice = 'N/A';
  try {
    const response = await axios.create({
      baseURL: 'https://api.iextrading.com/1.0/stock'
    }).get(sym+'/price');
    responsePrice = response.data;
  } catch(err) {
    //error in fetching
  }
  dispatch({ type: 'FETCH_CURRENT_PRICE', payload: {stock: sym, price: responsePrice} });
};