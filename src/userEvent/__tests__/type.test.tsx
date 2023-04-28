import * as React from 'react';
import { TextInput } from 'react-native';
import { render } from '../..';
import { userEvent } from '..';

interface EventEntry {
  id: number;
  name: string;
  nativeEvent: any;
}

function createEventToolkit() {
  let id = 0;
  const events: EventEntry[] = [];
  const handleEvent = (name: string) => {
    return (event: any) => {
      events.push({
        id,
        name,
        nativeEvent: event?.nativeEvent,
      });

      id += 1;
    };
  };

  return { events, handleEvent };
}

function renderTextInputWithToolkit() {
  const { events, handleEvent } = createEventToolkit();

  const screen = render(
    <TextInput
      testID="input"
      onFocus={handleEvent('focus')}
      onBlur={handleEvent('blur')}
      onPressIn={handleEvent('pressIn')}
      onPressOut={handleEvent('pressOut')}
      onChange={handleEvent('change')}
      onChangeText={handleEvent('changeText')}
      onTextInput={handleEvent('textInput')}
      onKeyPress={handleEvent('keyPress')}
      onSelectionChange={handleEvent('selectionChange')}
      onSubmitEditing={handleEvent('onSubmitEditing')}
      onContentSizeChange={handleEvent('contentSizeChange')}
    />
  );

  return {
    ...screen,
    events,
  };
}

test('userEvent.type on TextInput', async () => {
  const { events, ...queries } = renderTextInputWithToolkit();

  await userEvent.type(queries.getByTestId('input'), 'Hello');

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
