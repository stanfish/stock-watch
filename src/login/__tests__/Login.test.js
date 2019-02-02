import React from 'react';
import ReactDOM from 'react-dom';
import Login from 'login/Login';
import { shallow } from 'enzyme';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Login />);
});

afterEach(() => {
  wrapper.unmount();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Login />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('has those 4 buttons before login', () => {
  expect(wrapper.find({primary: true}).length).toEqual(1);
  expect(wrapper.find({primary: true}).html()).toContain('Log in');
  expect(wrapper.find({secondary: true}).length).toEqual(1);
  expect(wrapper.find({secondary: true}).html()).toContain('Sign up');  
  expect(wrapper.find('#googleLogin').length).toEqual(1);
  expect(wrapper.find('#facebookLogin').length).toEqual(1);
});

it('has log out buttons after login', () => {
  const instance = wrapper.instance();
  instance.setUser({user: 'mock_user'});
  expect(wrapper.find({secondary: true}).length).toEqual(1);
  expect(wrapper.find({secondary: true}).html()).toContain('Log out');
});

it('has those 4 buttons after login and logout', () => {
  const instance = wrapper.instance();
  instance.setUser({user: 'mock_user'});
  expect(wrapper.find({secondary: true}).length).toEqual(1);
  expect(wrapper.find({secondary: true}).html()).toContain('Log out');
  instance.setUser(null);
  expect(wrapper.find({primary: true}).length).toEqual(1);
  expect(wrapper.find({primary: true}).html()).toContain('Log in');
  expect(wrapper.find({secondary: true}).length).toEqual(1);
  expect(wrapper.find({secondary: true}).html()).toContain('Sign up');  
  expect(wrapper.find('#googleLogin').length).toEqual(1);
  expect(wrapper.find('#facebookLogin').length).toEqual(1);
});