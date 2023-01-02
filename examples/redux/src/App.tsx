import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { CounterScreen } from './feature/counter/CounterScreen';

const App = () => {
  return (
    <Provider store={store}>
      <CounterScreen />
    </Provider>
  );
};

export default App;
