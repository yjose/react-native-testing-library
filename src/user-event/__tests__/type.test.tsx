import * as React from 'react';
import { TextInput } from 'react-native';
import { createEventToolkit } from '../../test-utils/events';
import { render } from '../..';
import { userEvent } from '..';

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

  await userEvent.type(queries.getByTestId('input'), 'ABC');

  const eventNames = events.map((e) => e.name);
  expect(eventNames).toEqual([
    'pressIn',
    'focus',
    'pressOut',
    'keyPress',
    'textInput',
    'change',
    'changeText',
    'selectionChange',
    'keyPress',
    'textInput',
    'change',
    'changeText',
    'selectionChange',
    'keyPress',
    'textInput',
    'change',
    'changeText',
    'selectionChange',
    'onSubmitEditing',
    'blur',
  ]);

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

test('userEvent.type skips press events when `skipPress: true`', async () => {
  const { events, ...queries } = renderTextInputWithToolkit();
  await userEvent.type(queries.getByTestId('input'), 'abc', {
    skipPress: true,
  });

  const eventNames = events.map((e) => e.name);
  expect(eventNames).not.toContainEqual('pressIn');
  expect(eventNames).not.toContainEqual('pressOut');
  expect(events).toMatchSnapshot('events without press events');
});
