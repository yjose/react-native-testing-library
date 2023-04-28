import { ReactTestInstance } from 'react-test-renderer';
import { invokeEvent } from '../fireEvent';
import { wait } from './wait';
import {
  buildBlurEvent,
  buildChangeEvent,
  buildFocusEvent,
  buildKeyPressEvent,
  buildTextInputEvent,
} from './event-builders';

interface TypeOptions {
  skipPress?: boolean;
}

export async function type(
  element: ReactTestInstance,
  text: string,
  options?: TypeOptions
): Promise<void> {
  const initialText = element.props.value ?? element.props.defaultValue ?? '';
  const keys = parseKeys(text);

  await wait();
  invokeEvent(element, 'pressIn');

  // TODO support exisiting text
  await wait();
  invokeEvent(element, 'focus', undefined, buildFocusEvent());

  await wait();
  invokeEvent(element, 'pressOut');

  let currentText = initialText;
  for (const key of keys) {
    const previousText = currentText;
    currentText += key;

    await wait();
    invokeEvent(element, 'keyPress', undefined, buildKeyPressEvent(key));
    invokeEvent(
      element,
      'textInput',
      undefined,
      buildTextInputEvent(currentText, previousText)
    );
    invokeEvent(element, 'change', undefined, buildChangeEvent(currentText));
    invokeEvent(element, 'changeText', undefined, currentText);
    invokeEvent(element, 'selectionChange', undefined, key);
  }

  // TODO: check if submitEditing in necessary
  await wait();
  invokeEvent(element, 'submitEditing');

  await wait();
  invokeEvent(element, 'blur', buildBlurEvent());
}

export function parseKeys(text: string) {
  return text.split('');
}
