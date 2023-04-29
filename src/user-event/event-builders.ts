/**
 * Experimental values:
 * - iOS: `{"eventCount": 0, "target": 75, "text": ""}`
 * - Android: `{"target": 53}`
 */
export function buildFocusEvent() {
  return {
    nativeEvent: {
      target: 0,
    },
  };
}

/**
 * Experimental values:
 * - iOS: `{"eventCount": 0, "target": 75, "text": ""}`
 * - Android: `{"target": 53}`
 */
export function buildBlurEvent() {
  return {
    nativeEvent: {
      target: 0,
    },
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
    nativeEvent: { text, target: 0 },
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
      range: { start: text.length, end: text.length },
      target: 0,
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

/**
 * Experimental values:
 * - iOS: `{"changedTouches": [[Circular]], "identifier": 1, "locationX": 253, "locationY": 30.333328247070312, "pageX": 273, "pageY": 141.3333282470703, "target": 75, "timestamp": 875928682.0450834, "touches": [[Circular]]}`
 * - Android: `{"changedTouches": [[Circular]], "identifier": 0, "locationX": 160, "locationY": 40.3636360168457, "pageX": 180, "pageY": 140.36363220214844, "target": 53, "targetSurface": -1, "timestamp": 10290805, "touches": [[Circular]]}`
 */
export function buildTouchEvent() {
  return {
    nativeEvent: {
      changedTouches: [],
      identifier: 0,
      locationX: 0,
      locationY: 0,
      pageX: 0,
      pageY: 0,
      target: 0,
      timestamp: Date.now(),
      touches: [],
    },
  };
}

/**
 * Experimental values:
 * - iOS: `{"eventCount": 4, "target": 75, "text": "Test"}`
 * - Android: `{"target": 53, "text": "Test"}`
 */
export function buildSubmitEditingEvent(text: string) {
  return {
    nativeEvent: { text, target: 0 },
  };
}
