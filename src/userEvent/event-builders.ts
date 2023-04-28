/**
 * Experimental values:
 * - iOS: `{"eventCount": 0, "target": 75, "text": ""}`
 * - Android: `{"target": 53}`
 */
export function buildFocusEvent() {
  return {
    nativeEvent: {},
  };
}

/**
 * Experimental values:
 * - iOS: `{"eventCount": 0, "target": 75, "text": ""}`
 * - Android: `{"target": 53}`
 */
export function buildBlurEvent() {
  return {
    nativeEvent: {},
  };
}

/**
 * Experimental values:
 * - iOS: `{"eventCount": 3, "key": "a", "target": 75}`
 * - Android: `{"key": "a"}`
 */
export function buildKeyPressEvent(key: string) {
  return {
    nativeEvent: { key },
  };
}

/**
 * Experimental values:
 * - iOS: `{"eventCount": 4, "target": 75, "text": "Test"}`
 * - Android: `{"eventCount": 6, "target": 53, "text": "Tes"}`
 */
export function buildChangeEvent(text: string) {
  return {
    nativeEvent: { text },
  };
}

/**
 * Experimental values:
 * - iOS: `{"eventCount": 2, "previousText": "Te", "range": {"end": 2, "start": 2}, "target": 75, "text": "s"}`
 * - Android: `{"previousText": "Te", "range": {"end": 2, "start": 0}, "target": 53, "text": "Tes"}`
 */
export function buildTextInputEvent(text: string, previousText: string) {
  return {
    nativeEvent: {
      text,
      previousText,
      range: buildRangeFromText(previousText),
    },
  };
}

/**
 * Experimental values:
 * - iOS: `{"selection": {"end": 4, "start": 4}, "target": 75}`
 * - Android: `{"selection": {"end": 4, "start": 4}}`
 */
export function buildSelectionChangeEvent(start: number, end: number) {
  return {
    nativeEvent: { selection: { start, end } },
  };
}

export function buildRangeFromText(text: string) {
  return { start: text.length, end: text.length };
}
