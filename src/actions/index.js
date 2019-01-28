import moment from 'moment';
import axios from 'axios';

export const setUser = (user) => ({
    type: 'SET_USER',
    payload: {
      user
    }
  });

export const setStocks = (stocks) => ({
    type: 'SET_STOCKS',
    payload: {
      stocks
    }
  });

export const setDateRange = (fromDate, toDate) => ({
    type: 'SET_DATE_RANGE',
    payload: {
      fromDate,
      toDate,
    }
  });

export const fetchCurrentPrice = sym => async (dispatch) => {
  let responsePrice = 'N/A';
  try {
    const response = await axios.create({
      baseURL: 'https://api.iextrading.com/1.0/stock',
    }).get(`${sym}/price`);
    responsePrice = response.data;
  } catch (err) {
    // error in fetching
  }
  dispatch({ type: 'FETCH_CURRENT_PRICE', payload: { stock: sym, price: responsePrice } });
};

export const fetchCompany = sym => async (dispatch) => {
  let responseCompany = '';
  try {
    const response = await axios.create({
      baseURL: 'https://api.iextrading.com/1.0/stock',
    }).get(`${sym}/company`);
    responseCompany = response.data.companyName;
  } catch (err) {
    // error in fetching
  }
  dispatch({ type: 'FETCH_COMPANY', payload: { stock: sym, company: responseCompany } });
};


export const fetchDatePrice = (sym, date, isFrom) => async (dispatch) => {
  const today = moment(new Date()).format('MM/DD/YYYY');
  const fetchDate = moment(date).format('MM/DD/YYYY');
  if (today === fetchDate) {
    dispatch({ type: 'FETCH_DATE_PRICE', payload: { stock: sym, isFrom } });
    return;
  }

  let responsePrice = 'N/A';
  try {
    const response = await axios.create({
      baseURL: 'https://api.iextrading.com/1.0/stock/',
    }).get(`${sym}/chart/date/${date}`);
    responsePrice = response.data[response.data.length - 1].average;
  } catch (err) {
    // error in fetching
  }
  dispatch({ type: 'FETCH_DATE_PRICE', payload: { stock: sym, price: responsePrice, isFrom } });
};
