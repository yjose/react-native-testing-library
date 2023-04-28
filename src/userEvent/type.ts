import { ReactTestInstance } from 'react-test-renderer';
import { invokeEvent } from '../fireEvent';
import { wait } from './wait';

interface TypeOptions {
  skipPress?: boolean;
}

export async function type(
  element: ReactTestInstance,
  text: string,
  options?: TypeOptions
): Promise<void> {
  const keys = parseKeys(text);

  await wait();
  invokeEvent(element, 'pressIn');

  // TODO support exisiting text
  await wait();
  invokeEvent(element, 'focus', undefined, buildFocusEvent(''));

  await wait();
  invokeEvent(element, 'pressOut');

  for (const key of keys) {
    await wait();
    invokeEvent(element, 'keyPress', undefined, buildKeyPressEvent(key));
    invokeEvent(element, 'textInput', key);
    invokeEvent(element, 'change', key);
    invokeEvent(element, 'changeText', key);
    invokeEvent(element, 'selectionChange', key);
    invokeEvent(element, 'contentSizeChange', key);
  }

  // TODO: check if submitEditing in necessary
  await wait();
  invokeEvent(element, 'submitEditing');

  await wait();
  invokeEvent(element, 'blur', buildFocusEvent(text));
}

function parseKeys(text: string) {
  return text.split('');
}

function buildFocusEvent(text: string) {
  return {
    nativeEvent: {
      text,
    },
  };
}

function buildKeyPressEvent(key: string) {
  return {
    nativeEvent: {
      key,
    },
  };
}
