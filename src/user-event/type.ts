import { ReactTestInstance } from 'react-test-renderer';
import { invokeEvent } from '../fireEvent';
import { wait } from './wait';
import { EventBuilder } from './event-builder';

interface TypeOptions {
  skipPress?: boolean;
  submitEditing?: boolean;
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
    invokeEvent(element, 'pressIn', type, EventBuilder.Common.touch());
  }

  await wait();
  invokeEvent(element, 'focus', type, EventBuilder.Common.focus());

  if (options?.skipPress !== true) {
    invokeEvent(element, 'pressOut', type, EventBuilder.Common.touch());
  }

  let currentText = initialText;
  for (const key of keys) {
    const previousText = currentText;
    currentText += key;

    await wait();
    invokeEvent(
      element,
      'keyPress',
      type,
      EventBuilder.TextInput.keyPress(key)
    );
    invokeEvent(
      element,
      'textInput',
      type,
      EventBuilder.TextInput.textInput(currentText, previousText)
    );
    invokeEvent(
      element,
      'change',
      type,
      EventBuilder.TextInput.change(currentText)
    );
    invokeEvent(element, 'changeText', type, currentText);
    invokeEvent(
      element,
      'selectionChange',
      type,
      EventBuilder.TextInput.selectionChange(
        currentText.length,
        currentText.length
      )
    );
  }

  if (options?.submitEditing === true) {
    await wait();
    invokeEvent(
      element,
      'submitEditing',
      type,
      EventBuilder.TextInput.submitEditing(currentText)
    );
  }

  await wait();
  invokeEvent(
    element,
    'endEditing',
    type,
    EventBuilder.TextInput.endEditing(currentText)
  );
  invokeEvent(element, 'blur', undefined, EventBuilder.Common.blur());
}

export function parseKeys(text: string) {
  return text.split('');
}
