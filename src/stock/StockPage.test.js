import React from 'react';
import ReactDOM from 'react-dom';
import StockPage from './StockPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StockPage />, div);
});
