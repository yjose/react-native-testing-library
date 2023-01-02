import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import App from './App';

beforeEach(() => {
  // TODO: reset redux store
});

test('Can increase counter', () => {
  render(<App />);
  const counter = screen.getByText('Count: 0');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  fireEvent.press(incrementButton);
  expect(counter).toHaveTextContent('Count: 1');

  fireEvent.press(incrementButton);
  expect(counter).toHaveTextContent('Count: 2');
});

test('Can decrease counter', () => {
  render(<App />);
  const counter = screen.getByText('Count: 0');
  const descrementButton = screen.getByRole('button', { name: 'Decrement' });

  fireEvent.press(descrementButton);
  expect(counter).toHaveTextContent('Count: 1');

  fireEvent.press(descrementButton);
  expect(counter).toHaveTextContent('Count: 2');
});
