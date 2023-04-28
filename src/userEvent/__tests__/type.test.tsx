import * as React from 'react';
import { TextInput } from 'react-native';
import { render } from '../..';
import { userEvent } from '..';

interface EventEntry {
  name: string;
  nativeEvent: any;
}

function createEventToolkit() {
  const events: EventEntry[] = [];
  const handleEvent = (name: string) => {
    return (event: any) => {
      events.push({
        name,
        nativeEvent: event?.nativeEvent,
      });
    };
  };

  return { events, handleEvent };
}

test('userEvent.type on TextInput', async () => {
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
      onContentSizeChange={handleEvent('contentSizeChange')}
    />
  );

  await userEvent.type(screen.getByTestId('input'), 'Hello');
  expect(events).toMatchInlineSnapshot(`
    [
      {
        "name": "pressIn",
        "nativeEvent": undefined,
      },
      {
        "name": "focus",
        "nativeEvent": {
          "text": "",
        },
      },
      {
        "name": "pressOut",
        "nativeEvent": undefined,
      },
      {
        "name": "keyPress",
        "nativeEvent": {
          "key": "H",
        },
      },
      {
        "name": "textInput",
        "nativeEvent": undefined,
      },
      {
        "name": "change",
        "nativeEvent": undefined,
      },
      {
        "name": "changeText",
        "nativeEvent": undefined,
      },
      {
        "name": "selectionChange",
        "nativeEvent": undefined,
      },
      {
        "name": "contentSizeChange",
        "nativeEvent": undefined,
      },
      {
        "name": "keyPress",
        "nativeEvent": {
          "key": "e",
        },
      },
      {
        "name": "textInput",
        "nativeEvent": undefined,
      },
      {
        "name": "change",
        "nativeEvent": undefined,
      },
      {
        "name": "changeText",
        "nativeEvent": undefined,
      },
      {
        "name": "selectionChange",
        "nativeEvent": undefined,
      },
      {
        "name": "contentSizeChange",
        "nativeEvent": undefined,
      },
      {
        "name": "keyPress",
        "nativeEvent": {
          "key": "l",
        },
      },
      {
        "name": "textInput",
        "nativeEvent": undefined,
      },
      {
        "name": "change",
        "nativeEvent": undefined,
      },
      {
        "name": "changeText",
        "nativeEvent": undefined,
      },
      {
        "name": "selectionChange",
        "nativeEvent": undefined,
      },
      {
        "name": "contentSizeChange",
        "nativeEvent": undefined,
      },
      {
        "name": "keyPress",
        "nativeEvent": {
          "key": "l",
        },
      },
      {
        "name": "textInput",
        "nativeEvent": undefined,
      },
      {
        "name": "change",
        "nativeEvent": undefined,
      },
      {
        "name": "changeText",
        "nativeEvent": undefined,
      },
      {
        "name": "selectionChange",
        "nativeEvent": undefined,
      },
      {
        "name": "contentSizeChange",
        "nativeEvent": undefined,
      },
      {
        "name": "keyPress",
        "nativeEvent": {
          "key": "o",
        },
      },
      {
        "name": "textInput",
        "nativeEvent": undefined,
      },
      {
        "name": "change",
        "nativeEvent": undefined,
      },
      {
        "name": "changeText",
        "nativeEvent": undefined,
      },
      {
        "name": "selectionChange",
        "nativeEvent": undefined,
      },
      {
        "name": "contentSizeChange",
        "nativeEvent": undefined,
      },
      {
        "name": "blur",
        "nativeEvent": undefined,
      },
    ]
  `);
});
