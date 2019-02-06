import React from 'react';
import ReactDOM from 'react-dom';
import AddStock from 'stock/AddStock';
import Root from 'Root';
import { mount } from 'enzyme';

let wrapper;
beforeEach(() => {
  wrapper = mount(
    <Root>
      <AddStock />
    </Root>
  );
});

afterEach(() => {
  wrapper.unmount();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Root>
      <AddStock />
    </Root>  
  , div);
  ReactDOM.unmountComponentAtNode(div);
});

it('has Add Stock button', () => {
  expect(wrapper.find('.button').length).toEqual(1);
  expect(wrapper.find('.button').html()).toContain('Add Stock');
});

it('has input box', () => {
  expect(wrapper.find('input[type="text"]').length).toEqual(1);
});
