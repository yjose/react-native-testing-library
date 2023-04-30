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
      onSubmitEditing={handleEvent('submitEditing')}
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
    'endEditing',
    'blur',
  ]);

  // TODO: inspect details
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
    'textInput',
    'change',
    'changeText',
    'selectionChange',
    'endEditing',
    'blur',
  ]);

  // TODO: inspect details
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
    'textInput',
    'change',
    'changeText',
    'selectionChange',
    'submitEditing',
    'endEditing',
    'blur',
  ]);

  expect(events[8].nativeEvent).toEqual({
    text: 'a',
    target: expect.any(Number),
  });
});
