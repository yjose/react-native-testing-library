import * as React from 'react';
import { TextInput } from 'react-native';
import { createEventToolkit } from '../../test-utils/events';
import { render } from '../..';
import { userEvent } from '..';

interface ManagedTextInputProps {
  handleEvent: (name: string) => (event: any) => void;
  fixedValue?: string;
}

function ManagedTextInput({ handleEvent, fixedValue }: ManagedTextInputProps) {
  const [value, setValue] = React.useState('');

  const handleChangeText = (text: string) => {
    handleEvent('changeText')(text);
    setValue(text);
  };

  return (
    <TextInput
      testID="input"
      value={fixedValue ?? value}
      onChangeText={handleChangeText}
      onFocus={handleEvent('focus')}
      onBlur={handleEvent('blur')}
      onPressIn={handleEvent('pressIn')}
      onPressOut={handleEvent('pressOut')}
      onChange={handleEvent('change')}
      onTextInput={handleEvent('textInput')}
      onKeyPress={handleEvent('keyPress')}
      onSelectionChange={handleEvent('selectionChange')}
      onSubmitEditing={handleEvent('onSubmitEditing')}
      onContentSizeChange={handleEvent('contentSizeChange')}
    />
  );
}

test('userEvent.type on TextInput', async () => {
  const { events, handleEvent } = createEventToolkit();
  const screen = render(<ManagedTextInput handleEvent={handleEvent} />);
  await userEvent.type(screen.getByTestId('input'), 'Hello');

  const entryEvents = events.slice(0, 3);
  const exitEvents = events.slice(events.length - 2);
  const typingEvents = events.slice(
    entryEvents.length,
    events.length - exitEvents.length
  );

  expect(entryEvents).toMatchSnapshot('entry events');
  expect(typingEvents).toMatchSnapshot('typing events');
  expect(exitEvents).toMatchSnapshot('exit events');
});

test('userEvent.type on rejecting TextInput', async () => {
  const { events, handleEvent } = createEventToolkit();
  const screen = render(<ManagedTextInput handleEvent={handleEvent} />);
  await userEvent.type(screen.getByTestId('input'), 'Hello');

  const entryEvents = events.slice(0, 3);
  const exitEvents = events.slice(events.length - 2);
  const typingEvents = events.slice(
    entryEvents.length,
    events.length - exitEvents.length
  );

  expect(entryEvents).toMatchSnapshot('entry events');
  expect(typingEvents).toMatchSnapshot('typing events');
  expect(exitEvents).toMatchSnapshot('exit events');
});
