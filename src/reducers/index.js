import { combineReducers } from 'redux';
import userReducer from './userReducer';
import stockReducer from './stockReducer';
import stockMapReducer from './stockMapReducer';
import dateRangeReducer from './dateRangeReducer';

export default combineReducers({
  user: userReducer,
  stocks: stockReducer,
  stockMap: stockMapReducer,
  dateRange: dateRangeReducer,
});
