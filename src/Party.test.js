import React from 'react';
import ReactDOM from 'react-dom';
import Party from './Party';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Party />, div);
});
