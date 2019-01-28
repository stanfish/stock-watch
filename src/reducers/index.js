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
  const {stock, price, isFrom, company} = action.payload || {};
  if (action.type === 'FETCH_CURRENT_PRICE') {
    if (!stocks[stock] || !stocks[stock].currentPrice) {
      let newStocks = {...stocks};
      newStocks[stock] = newStocks[stock] || {};
      newStocks[stock].currentPrice = price;
      return newStocks;
    }
  } else if (action.type === 'FETCH_COMPANY') {
    if (!stocks[stock] || !stocks[stock].company) {
      let newStocks = {...stocks};
      newStocks[stock] = newStocks[stock] || {};
      newStocks[stock].company = company;
      return newStocks;
    }    
  } else if (action.type === 'FETCH_DATE_PRICE') {
    let newStocks = {...stocks};
    let priceKey = isFrom ? "fromPrice" : "toPrice";
    newStocks[stock] = newStocks[stock] || {};
    newStocks[stock][priceKey] = price || newStocks[stock].currentPrice;

    if (newStocks[stock] && newStocks[stock].fromPrice && newStocks[stock].toPrice) {
      let percentChange = (newStocks[stock].toPrice - newStocks[stock].fromPrice) / newStocks[stock].fromPrice * 100;
      percentChange = Math.round(percentChange * 1000) / 1000;
      newStocks[stock].percent = percentChange;
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