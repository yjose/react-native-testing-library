import * as React from 'react';
import { screen, fireEvent } from '@testing-library/react-native';
import { renderWithRedux } from '../../../test-utils/render';
import { RootState } from '../../redux/store';
import { CounterScreen } from './CounterScreen';

test('Can increase counter', () => {
  renderWithRedux(<CounterScreen />);
  const counter = screen.getByText('Count: 0');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  fireEvent.press(incrementButton);
  expect(counter).toHaveTextContent('Count: 1');

  fireEvent.press(incrementButton);
  expect(counter).toHaveTextContent('Count: 2');
});

test('Can decrease counter', () => {
  const state: RootState = { counter: { value: 10 } };
  renderWithRedux(<CounterScreen />, { state });
  const counter = screen.getByText('Count: 10');
  const descrementButton = screen.getByRole('button', { name: 'Decrement' });

  fireEvent.press(descrementButton);
  expect(counter).toHaveTextContent('Count: 9');

  fireEvent.press(descrementButton);
  expect(counter).toHaveTextContent('Count: 8');
});
