import React from 'react';
import ReactDOM from 'react-dom';
import login from './login';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<login />, div);
});