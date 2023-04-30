import * as React from 'react';
import { TextInput } from 'react-native';
import { createEventToolkit } from '../../test-utils/events';
import { render } from '../..';
import { userEvent } from '..';

interface ManagedTextInputProps {
  valueTransformer?: (text: string) => string;
  handleEvent: (name: string) => (event: any) => void;
}

function ManagedTextInput({
  handleEvent,
  valueTransformer,
}: ManagedTextInputProps) {
  const [value, setValue] = React.useState('');

  const handleChangeText = (text: string) => {
    handleEvent('changeText')(text);
    const newValue = valueTransformer?.(text) ?? text;
    setValue(newValue);
  };

  return (
    <TextInput
      testID="input"
      value={value}
      onChangeText={handleChangeText}
      onFocus={handleEvent('focus')}
      onBlur={handleEvent('blur')}
      onPressIn={handleEvent('pressIn')}
      onPressOut={handleEvent('pressOut')}
      onChange={handleEvent('change')}
      onTextInput={handleEvent('textInput')}
      onKeyPress={handleEvent('keyPress')}
      onSelectionChange={handleEvent('selectionChange')}
      onSubmitEditing={handleEvent('submitEditing')}
      onContentSizeChange={handleEvent('contentSizeChange')}
    />
  );
}

test('userEvent.type on TextInput', async () => {
  const { events, handleEvent } = createEventToolkit();
  const screen = render(<ManagedTextInput handleEvent={handleEvent} />);

  await userEvent.type(screen.getByTestId('input'), 'Wow');

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

test('userEvent.type on rejecting TextInput', async () => {
  const { events, handleEvent } = createEventToolkit();
  const screen = render(
    <ManagedTextInput
      handleEvent={handleEvent}
      valueTransformer={() => 'No Change'}
    />
  );

  await userEvent.type(screen.getByTestId('input'), 'FTW');

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

  expect(events[3]).toMatchInlineSnapshot();
});
