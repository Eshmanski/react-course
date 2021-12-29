// Установить перед настройкой тестирования enzyme enzyme-adapter-react-16 react-test-renderer
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import Character from './Character';
import React from 'react';

configure({
  adapter: new Adapter
});

describe('<App />', () => {
  let wrapper;
  // вызывается перед каждым it
  beforeEach(() => {
    // wraper результат рендера апп
    wrapper = shallow(<App />);
  });

  it('Should render 3 characters in light side', () => {
    expect(wrapper.find(Character)).toHaveLength(3);
  });

  it('Should render 2 characters in light side', () => {
    wrapper.setProps({
      side: 'dark'
    });

    expect(wrapper.find(Character)).toHaveLength(2);
  });
});




// npm test для запуска теста
