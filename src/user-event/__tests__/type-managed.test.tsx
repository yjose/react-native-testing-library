import * as React from 'react';
import { TextInput } from 'react-native';
import { createEventToolkit } from '../../test-utils/events';
import { render } from '../..';
import { userEvent } from '..';

interface ManagedTextInputProps {
  valueTransformer?: (text: string) => string;
  handleEvent: (name: string) => (event: any) => void;
  initialValue?: string;
}

function ManagedTextInput({
  handleEvent,
  valueTransformer,
  initialValue = '',
}: ManagedTextInputProps) {
  const [value, setValue] = React.useState(initialValue);

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
      onKeyPress={handleEvent('keyPress')}
      onSelectionChange={handleEvent('selectionChange')}
      onSubmitEditing={handleEvent('submitEditing')}
      onEndEditing={handleEvent('endEditing')}
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

  // TODO: inspect details
});

test('userEvent.type on rejecting TextInput', async () => {
  const { events, handleEvent } = createEventToolkit();
  const screen = render(
    <ManagedTextInput
      initialValue="XXX"
      handleEvent={handleEvent}
      valueTransformer={() => 'XXX'}
    />
  );

  await userEvent.type(screen.getByTestId('input'), 'ABC');

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

  expect(events[3]).toEqual({
    name: 'keyPress',
    nativeEvent: { key: 'A' },
  });
  expect(events[4]).toEqual({
    name: 'change',
    nativeEvent: {
      text: 'XXXA',
      target: 0,
      eventCount: 0,
    },
  });
  expect(events[5]).toEqual({
    name: 'changeText',
    event: 'XXXA',
  });
  expect(events[6]).toEqual({
    name: 'selectionChange',
    nativeEvent: { selection: { start: 4, end: 4 } },
  });

  expect(events[7]).toEqual({
    name: 'keyPress',
    nativeEvent: { key: 'B' },
  });
  expect(events[8]).toEqual({
    name: 'change',
    nativeEvent: {
      text: 'XXXB',
      target: 0,
      eventCount: 0,
    },
  });
  expect(events[9]).toEqual({
    name: 'changeText',
    event: 'XXXB',
  });
  expect(events[10]).toEqual({
    name: 'selectionChange',
    nativeEvent: { selection: { start: 4, end: 4 } },
  });

  expect(events[11]).toEqual({
    name: 'keyPress',
    nativeEvent: { key: 'C' },
  });
  expect(events[12]).toEqual({
    name: 'change',
    nativeEvent: {
      text: 'XXXC',
      target: 0,
      eventCount: 0,
    },
  });
  expect(events[13]).toEqual({
    name: 'changeText',
    event: 'XXXC',
  });
  expect(events[14]).toEqual({
    name: 'selectionChange',
    nativeEvent: { selection: { start: 4, end: 4 } },
  });

  expect(events[15]).toEqual({
    name: 'endEditing',
    nativeEvent: { text: 'XXX', target: 0 },
  });
});
