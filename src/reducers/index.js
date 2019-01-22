import { combineReducers } from 'redux';

const userReducer = (user=null, action) => {
  if (action.type === 'SET_USER') {
    return action.payload.user;
  }
  return user;
}

const stockReducer = (stocks=null, action) => {
  if (action.type === 'SET_STOCKS') {
    return action.payload.stocks;
  }
  return stocks;
}


export default combineReducers({
  user: userReducer,
  stocks: stockReducer
});