import React from 'react';
import { shallow } from 'enzyme';
import { UserAppMenu } from '../Views/components/UserAppMenu';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';

describe('UserAppMenu', () => {
  let wrapper;
  let logoutStub;
  let fakeHistory;
  let historyPushStub;

  beforeEach(() => {
    logoutStub = jest.fn();
    historyPushStub = jest.fn();
    fakeHistory = {
      push: historyPushStub
    };
    wrapper = shallow(
      <UserAppMenu user="Estrella" classes={{}} logout={logoutStub} history={fakeHistory} />
    );
  });

  it('should display the name of the user in a button in the AppBar', () => {
    const appBarButton = wrapper.find(Button);
    expect(appBarButton.text()).toBe('Estrella');
  });

  it('should open menu when clicking on the button', () => {
    const appBarButton = wrapper.find(Button);
    appBarButton.simulate('click');

    expect(wrapper.state('menuOpen')).toBe(true);
    const menuPopper = wrapper.find(Popper);
    expect(menuPopper.prop('open')).toBe(true);
  });

  it('should close menu again when clicking twice on the button', () => {
    const appBarButton = wrapper.find(Button);
    appBarButton.simulate('click');
    appBarButton.simulate('click');

    expect(wrapper.state('menuOpen')).toBe(false);
    const menuPopper = wrapper.find(Popper);
    expect(menuPopper.prop('open')).toBe(false);
  });
});
