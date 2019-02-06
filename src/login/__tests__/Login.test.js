import React from 'react';
import ReactDOM from 'react-dom';
import Login from 'login/Login';
import { shallow } from 'enzyme';
const firebase = require('firebase.js');
jest.mock('firebase.js');

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

it('has 1 text input and 1 password input before login', () => {
  expect(wrapper.find({type: 'text'}).length).toEqual(1);
  expect(wrapper.find({type: 'password'}).length).toEqual(1);
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
  wrapper.update();
  expect(wrapper.find({secondary: true}).length).toEqual(1);
  expect(wrapper.find({secondary: true}).html()).toContain('Log out');
});

it('has those 4 buttons after login and logout', () => {
  const instance = wrapper.instance();
  instance.setUser({user: 'mock_user'});
  wrapper.update();
  expect(wrapper.find({secondary: true}).length).toEqual(1);
  expect(wrapper.find({secondary: true}).html()).toContain('Log out');
  instance.setUser(null);
  wrapper.update();
  expect(wrapper.find({primary: true}).length).toEqual(1);
  expect(wrapper.find({primary: true}).html()).toContain('Log in');
  expect(wrapper.find({secondary: true}).length).toEqual(1);
  expect(wrapper.find({secondary: true}).html()).toContain('Sign up');  
  expect(wrapper.find('#googleLogin').length).toEqual(1);
  expect(wrapper.find('#facebookLogin').length).toEqual(1);
});

it('sign up successfully', () => {
  let mockCreateUserWithEmailAndPassword = jest.fn();
  let authReturnValue = {
    createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
    onAuthStateChanged: jest.fn()
  };
  mockCreateUserWithEmailAndPassword.mockReturnValueOnce(new Promise((resolve, reject) => {resolve('Good');}))
  firebase.auth = authReturnValue;

  const mockEmail = "email@email.com";
  const mockPassword = "1234567";
  expect(wrapper.find({secondary: true}).html()).toContain('Sign up');  
  wrapper.find({type: 'text'}).simulate('change', {target: {name: "email", value: mockEmail}});
  wrapper.find({type: 'password'}).simulate('change', {target: {name: "password", value: mockPassword}});
  wrapper.find({secondary: true}).simulate('click');

  expect(mockCreateUserWithEmailAndPassword.mock.calls[0][0]).toEqual(mockEmail);
  expect(mockCreateUserWithEmailAndPassword.mock.calls[0][1]).toEqual(mockPassword);
  expect(mockCreateUserWithEmailAndPassword.mock.calls[0].length).toEqual(2);
});

it('sign up unsuccessfully', async () => {
  let mockCreateUserWithEmailAndPassword = jest.fn();
  let authReturnValue = {
    createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
    onAuthStateChanged: jest.fn()
  };
  const mockError = "Email has already been signed up";
  mockCreateUserWithEmailAndPassword.mockReturnValueOnce(new Promise((resolve, reject) => {reject({code: 400, message: mockError});}))
  firebase.auth = authReturnValue;

  const mockEmail = "email@email.com";
  const mockPassword = "1234567";
  wrapper.find({type: 'text'}).simulate('change', {target: {name: "email", value: mockEmail}});
  wrapper.find({type: 'password'}).simulate('change', {target: {name: "password", value: mockPassword}});
  await wrapper.find({secondary: true}).simulate('click');
  await wrapper.update();
  expect(wrapper.state().errorMessage).toEqual(mockError);
});

it('log in with email successfully', () => {
  let mockSignInWithEmailAndPassword = jest.fn();
  let authReturnValue = {
    signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
    onAuthStateChanged: jest.fn()
  };
  mockSignInWithEmailAndPassword.mockReturnValueOnce(new Promise((resolve, reject) => {resolve('Good');}))
  firebase.auth = authReturnValue;

  expect(wrapper.find({primary: true}).html()).toContain('Log in');
  const mockEmail = "email@email.com";
  const mockPassword = "1234567";
  wrapper.find({type: 'text'}).simulate('change', {target: {name: "email", value: mockEmail}});
  wrapper.find({type: 'password'}).simulate('change', {target: {name: "password", value: mockPassword}});
  wrapper.find({primary: true}).simulate('click', {preventDefault: ()=>''});

  expect(mockSignInWithEmailAndPassword.mock.calls[0][0]).toEqual(mockEmail);
  expect(mockSignInWithEmailAndPassword.mock.calls[0][1]).toEqual(mockPassword);
  expect(mockSignInWithEmailAndPassword.mock.calls[0].length).toEqual(2);
});

it('log in with email unsuccessfully', async () => {
  let mockSignInWithEmailAndPassword = jest.fn();
  let authReturnValue = {
    signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
    onAuthStateChanged: jest.fn()
  };
  const mockError = "Wrong password";
  mockSignInWithEmailAndPassword.mockReturnValueOnce(new Promise((resolve, reject) => {reject({code: 400, message: mockError});}))
  firebase.auth = authReturnValue;

  const mockEmail = "email@email.com";
  const mockPassword = "1234567";
  wrapper.find({type: 'text'}).simulate('change', {target: {name: "email", value: mockEmail}});
  wrapper.find({type: 'password'}).simulate('change', {target: {name: "password", value: mockPassword}});
  await wrapper.find({primary: true}).simulate('click', {preventDefault: ()=>''});
  await wrapper.update();
  expect(wrapper.state().errorMessage).toEqual(mockError);
});

it('log in with google login provider successfully', async () => {
  let mockSignInWithPopup = jest.fn();
  let authReturnValue = {
    signInWithPopup: mockSignInWithPopup,
    onAuthStateChanged: jest.fn()
  };
  const mockUser = 'user';
  mockSignInWithPopup.mockReturnValueOnce(new Promise((resolve, reject) => {resolve({user:mockUser});}))
  firebase.auth = authReturnValue;

  expect(wrapper.find('#googleLogin').length).toEqual(1);
  await wrapper.find('#googleLogin').simulate('click', {target: {id: 'googleLogin'}});
  await wrapper.update();
  expect(wrapper.state().user).toEqual(mockUser);
});

it('log in with google login provider unsuccessfully', async () => {
  let mockSignInWithPopup = jest.fn();
  let authReturnValue = {
    signInWithPopup: mockSignInWithPopup,
    onAuthStateChanged: jest.fn()
  };
  const mockError = 'Login error';
  mockSignInWithPopup.mockReturnValueOnce(new Promise((resolve, reject) => {reject({code: 400, message: mockError});}))
  firebase.auth = authReturnValue;

  await wrapper.find('#googleLogin').simulate('click', {target: {id: 'googleLogin'}});
  await wrapper.update();
  expect(wrapper.state().errorMessage).toEqual(mockError);
});

it('log in with facebook login provider successfully', async () => {
  let mockSignInWithPopup = jest.fn();
  let authReturnValue = {
    signInWithPopup: mockSignInWithPopup,
    onAuthStateChanged: jest.fn()
  };
  const mockUser = 'user';
  mockSignInWithPopup.mockReturnValueOnce(new Promise((resolve, reject) => {resolve({user:mockUser});}))
  firebase.auth = authReturnValue;

  expect(wrapper.find('#facebookLogin').length).toEqual(1);
  await wrapper.find('#facebookLogin').simulate('click', {target: {id: 'facebookLogin'}});
  await wrapper.update();
  expect(wrapper.state().user).toEqual(mockUser);
});

it('log in with facebook login provider unsuccessfully', async () => {
  let mockSignInWithPopup = jest.fn();
  let authReturnValue = {
    signInWithPopup: mockSignInWithPopup,
    onAuthStateChanged: jest.fn()
  };
  const mockError = 'Login error';
  mockSignInWithPopup.mockReturnValueOnce(new Promise((resolve, reject) => {reject({code: 400, message: mockError});}))
  firebase.auth = authReturnValue;

  await wrapper.find('#facebookLogin').simulate('click', {target: {id: 'facebookLogin'}});
  await wrapper.update();
  expect(wrapper.state().errorMessage).toEqual(mockError);
});
