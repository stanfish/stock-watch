import { combineReducers } from 'redux';

const userReducer = (user=null, action) => {
  if (action.type === 'SET_USER') {
    return action.payload.user;
  }
  return user;
}

const stockReducer = (stocks=[], action) => {
  if (action.type === 'SET_STOCKS') {
    return action.payload.stocks;
  }
  return stocks;
}


const dateRangeReducer = (state=null, action) => {
  if (action.type === 'SET_DATE_RANGE') {
    return {
      fromDate: action.payload.fromDate,
      toDate: action.payload.toDate,
    };
  }
  return state;
}

const stockMapReducer = (stocks={}, action) => {
  if (action.type === 'FETCH_CURRENT_PRICE') {
    if (!stocks[action.payload.stock] || !stocks[action.payload.stock].currentPrice) {
      let newStocks = {...stocks};
      newStocks[action.payload.stock] = newStocks[action.payload.stock] || {};
      newStocks[action.payload.stock].currentPrice = action.payload.price;
      return newStocks;
    }
  } else if (action.type === 'FETCH_DATE_PRICE') {
    let newStocks = {...stocks};
    let priceKey = action.payload.isFrom ? "fromPrice" : "toPrice";
    newStocks[action.payload.stock][priceKey] = action.payload.price;

    if (newStocks[action.payload.stock].fromPrice && newStocks[action.payload.stock].toPrice) {
      let percentChange = (newStocks[action.payload.stock].toPrice - newStocks[action.payload.stock].fromPrice) / newStocks[action.payload.stock].fromPrice * 100;
      percentChange = Math.round(percentChange * 1000) / 1000;
      newStocks[action.payload.stock].percent = percentChange;
    }

    return newStocks;    
  }
  return stocks;
}


export default combineReducers({
  user: userReducer,
  stocks: stockReducer,
  stockMap: stockMapReducer,
  dateRange: dateRangeReducer,
});