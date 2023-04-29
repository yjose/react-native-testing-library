import { ReactTestInstance } from 'react-test-renderer';
import { invokeEvent } from '../fireEvent';
import { wait } from './wait';
import {
  buildBlurEvent,
  buildChangeEvent,
  buildFocusEvent,
  buildKeyPressEvent,
  buildSelectionChangeEvent,
  buildSubmitEditingEvent,
  buildTextInputEvent,
  buildTouchEvent,
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

  if (options?.skipPress !== true) {
    await wait();
    invokeEvent(element, 'pressIn', undefined, buildTouchEvent());
  }

  await wait();
  invokeEvent(element, 'focus', undefined, buildFocusEvent());

  if (options?.skipPress !== true) {
    invokeEvent(element, 'pressOut', undefined, buildTouchEvent());
  }

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
    invokeEvent(
      element,
      'selectionChange',
      undefined,
      buildSelectionChangeEvent(currentText.length, currentText.length)
    );
  }

  // TODO: check if submitEditing in necessary
  await wait();
  invokeEvent(
    element,
    'submitEditing',
    undefined,
    buildSubmitEditingEvent(currentText)
  );

  await wait();
  invokeEvent(element, 'blur', undefined, buildBlurEvent());
}

export function parseKeys(text: string) {
  return text.split('');
}
