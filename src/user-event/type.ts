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

  let currentText = '';
  for (const key of keys) {
    const initialText = getManagedText(element) ?? currentText;
    currentText = initialText + key;

    emitSingleLineTypingEvents(element, key, currentText);
  }

  const finalText = getManagedText(element) ?? currentText;

  if (options?.submitEditing === true) {
    await wait();
    invokeEvent(
      element,
      'submitEditing',
      type,
      EventBuilder.TextInput.submitEditing(finalText)
    );
  }

  await wait();
  invokeEvent(
    element,
    'endEditing',
    type,
    EventBuilder.TextInput.endEditing(finalText)
  );
  invokeEvent(element, 'blur', undefined, EventBuilder.Common.blur());
}

async function emitSingleLineTypingEvents(
  element: ReactTestInstance,
  key: string,
  currentText: string
) {
  await wait();
  invokeEvent(element, 'keyPress', type, EventBuilder.TextInput.keyPress(key));

  // TODO: consider whether to emit these for single line inputs
  // invokeEvent(
  //   element,
  //   'textInput',
  //   type,
  //   EventBuilder.TextInput.textInput(currentText, previousText)
  // );

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

export function parseKeys(text: string) {
  return text.split('');
}

function getManagedText(element: ReactTestInstance) {
  return element.props.value ?? element.props.defaultValue;
}
