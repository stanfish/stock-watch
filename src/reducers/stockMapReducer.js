
export default (stocks={}, action) => {
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
    const {fromPrice, toPrice} = newStocks[stock];

    if (fromPrice && toPrice) {
      let percentChange = (toPrice - fromPrice) / fromPrice * 100;
      percentChange = Math.round(percentChange * 1000) / 1000;
      newStocks[stock].percent = percentChange;
    } else {
      newStocks[stock].percent = "-";
    }
    return newStocks;    
  }
  return stocks;
};
