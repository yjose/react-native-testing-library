import { ReactTestInstance } from 'react-test-renderer';
import { invokeEvent } from '../fireEvent';

interface TypeOptions {
  skipPress?: boolean;
}

export async function type(
  element: ReactTestInstance,
  text: string,
  options?: TypeOptions
): Promise<void> {
  const keys = parseKeys(text);

  invokeEvent(element, 'pressIn');

  // TODO support exisiting text
  invokeEvent(element, 'focus', buildFocusEvent(''));
  invokeEvent(element, 'pressOut');

  keys.forEach((key) => {
    invokeEvent(element, 'keyPress', buildKeyPressEvent(key));
    invokeEvent(element, 'textInput', key);
    invokeEvent(element, 'change', key);
    invokeEvent(element, 'changeText', key);
    invokeEvent(element, 'selectionChange', key);
    invokeEvent(element, 'contentSizeChange', key);
  });

  // TODO: check if submitEditing in necessary
  invokeEvent(element, 'submitEditing');
  invokeEvent(element, 'blur', buildFocusEvent(text));
}

function parseKeys(text: string) {
  return text.split('');
}

function buildFocusEvent(text: string) {
  return {
    nativeEvent: {
      text,
      eventCount: 0, // TODO
      target: 0, // TODO
    },
  };
}

function buildKeyPressEvent(key: string) {
  return {
    nativeEvent: {
      key,
      eventCount: 0, // TODO
      target: 0, // TODO
    },
  };
}
