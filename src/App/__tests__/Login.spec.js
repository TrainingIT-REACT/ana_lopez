import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../Views/Login';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

describe('Login', () => {
  let wrapper;
  let loginStub;
  let fakeHistory;
  let historyPushStub;
  let fakeLocation;
  let focusStub;

  beforeEach(() => {
    focusStub = jest.fn();
    jest.spyOn(React, 'createRef').mockReturnValue({
      current: { focus: focusStub }
    });
    loginStub = jest.fn();
    historyPushStub = jest.fn();
    fakeHistory = {
      push: historyPushStub
    };
    fakeLocation = {};
    wrapper = shallow(
      <Login
        user="Estrella"
        classes={{}}
        login={loginStub}
        history={fakeHistory}
        location={fakeLocation}
      />
    );
  });

  it('should focus in user name when mounting', () => {
    expect(focusStub).toHaveBeenCalled();
  });

  it('should display two text fields for user and password', () => {
    const textFields = wrapper.find(TextField);
    expect(textFields.length).toBe(2);
    expect(textFields.at(0).prop('label')).toBe('Usuario');
    expect(textFields.at(1).prop('label')).toBe('Contraseña');
    expect(textFields.at(1).prop('type')).toBe('password');
  });

  it('should display a button to login', () => {
    const button = wrapper.find(Button);
    expect(button.length).toBe(1);
    expect(button.text()).toBe('Iniciar sesión');
  });

  it('should set new value to user input when changing', () => {
    let userInput = wrapper.find(TextField).at(0);
    userInput.simulate('change', { target: { value: 'newValue', name: 'user' } });

    userInput = wrapper.find(TextField).at(0);
    expect(userInput.prop('value')).toBe('newValue');
  });

  it('should set new value to user input when changing', () => {
    let passwordInput = wrapper.find(TextField).at(1);
    passwordInput.simulate('change', { target: { value: 'newPassword', name: 'password' } });

    passwordInput = wrapper.find(TextField).at(1);
    expect(passwordInput.prop('value')).toBe('newPassword');
  });

  it('should login when clicking on login button', () => {
    let userInput = wrapper.find(TextField).at(0);
    userInput.simulate('change', { target: { value: 'someUser', name: 'user' } });
    let passwordInput = wrapper.find(TextField).at(1);
    passwordInput.simulate('change', { target: { value: 'somePassword', name: 'password' } });

    const button = wrapper.find(Button);
    button.simulate('click');

    expect(loginStub).toHaveBeenCalledWith('someUser', 'somePassword');
  });

  it('should go to home page when login', () => {
    const button = wrapper.find(Button);
    button.simulate('click');

    expect(historyPushStub).toHaveBeenCalledWith('/');
  });

  it('should display location message if any', () => {
    const fakeLocationStateMessage = 'This is a message that should be displayed';
    wrapper.setProps({
      location: { state: { message: fakeLocationStateMessage } }
    });

    const p = wrapper.find('p');
    expect(p.text()).toBe(fakeLocationStateMessage);
  });
});
