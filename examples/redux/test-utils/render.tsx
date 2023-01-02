/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react-native';
import { buildStore, RootState } from '../src/redux/store';

interface RenderWithReduxOptions {
  state?: RootState;
}

export function renderWithRedux(
  ui: React.ReactElement,
  { state }: RenderWithReduxOptions = {}
) {
  const store = buildStore(state);
  const queries = render(<Provider store={store}>{ui}</Provider>);
  return { ...queries, store };
}
