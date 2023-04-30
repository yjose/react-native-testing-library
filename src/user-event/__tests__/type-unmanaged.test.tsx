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
      onKeyPress={handleEvent('keyPress')}
      onSelectionChange={handleEvent('selectionChange')}
      onSubmitEditing={handleEvent('submitEditing')}
      onEndEditing={handleEvent('endEditing')}
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

  await userEvent.type(queries.getByTestId('input'), 'abc');

  const eventNames = events.map((e) => e.name);
  expect(eventNames).toEqual([
    'pressIn',
    'focus',
    'pressOut',
    'keyPress',
    'change',
    'changeText',
    'selectionChange',
    'keyPress',
    'change',
    'changeText',
    'selectionChange',
    'keyPress',
    'change',
    'changeText',
    'selectionChange',
    'endEditing',
    'blur',
  ]);

  // Input 'a'
  expect(events[3]).toEqual({
    name: 'keyPress',
    nativeEvent: { key: 'a' },
  });
  expect(events[4]).toEqual({
    name: 'change',
    nativeEvent: {
      text: 'a',
      target: 0,
      eventCount: 0,
    },
  });
  expect(events[5]).toEqual({
    name: 'changeText',
    event: 'a',
  });
  expect(events[6]).toEqual({
    name: 'selectionChange',
    nativeEvent: { selection: { start: 1, end: 1 } },
  });

  // Input 'b'
  expect(events[7]).toEqual({
    name: 'keyPress',
    nativeEvent: { key: 'b' },
  });
  expect(events[8]).toEqual({
    name: 'change',
    nativeEvent: {
      text: 'ab',
      target: 0,
      eventCount: 0,
    },
  });
  expect(events[9]).toEqual({
    name: 'changeText',
    event: 'ab',
  });
  expect(events[10]).toEqual({
    name: 'selectionChange',
    nativeEvent: { selection: { start: 2, end: 2 } },
  });

  // Input 'c'
  expect(events[11]).toEqual({
    name: 'keyPress',
    nativeEvent: { key: 'c' },
  });
  expect(events[12]).toEqual({
    name: 'change',
    nativeEvent: {
      text: 'abc',
      target: 0,
      eventCount: 0,
    },
  });
  expect(events[13]).toEqual({
    name: 'changeText',
    event: 'abc',
  });
  expect(events[14]).toEqual({
    name: 'selectionChange',
    nativeEvent: { selection: { start: 3, end: 3 } },
  });

  // Exit events
  expect(events[15]).toEqual({
    name: 'endEditing',
    nativeEvent: {
      text: 'abc',
      target: 0,
    },
  });
});

test('userEvent.type skips press events when `skipPress: true`', async () => {
  const { events, ...queries } = renderTextInputWithToolkit();
  await userEvent.type(queries.getByTestId('input'), 'a', {
    skipPress: true,
  });

  const eventNames = events.map((e) => e.name);
  expect(eventNames).not.toContainEqual('pressIn');
  expect(eventNames).not.toContainEqual('pressOut');
  expect(eventNames).toEqual([
    'focus',
    'keyPress',
    'change',
    'changeText',
    'selectionChange',
    'endEditing',
    'blur',
  ]);
});

test('userEvent.type triggers submit event with `submitEditing: true`', async () => {
  const { events, ...queries } = renderTextInputWithToolkit();
  await userEvent.type(queries.getByTestId('input'), 'a', {
    submitEditing: true,
  });

  const eventNames = events.map((e) => e.name);
  expect(eventNames).toEqual([
    'pressIn',
    'focus',
    'pressOut',
    'keyPress',
    'change',
    'changeText',
    'selectionChange',
    'submitEditing',
    'endEditing',
    'blur',
  ]);

  expect(events[7]).toEqual({
    name: 'submitEditing',
    nativeEvent: {
      text: 'a',
      target: 0,
    },
  });
});
