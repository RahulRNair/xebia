import React from 'react';
import ReactDOM from 'react-dom';
import dashboard from './dashboard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<dashboard />, div);
});