export const TextInputEventBuilder = {
  /**
   * Experimental values:
   * - iOS: `{"eventCount": 4, "target": 75, "text": "Test"}`
   * - Android: `{"eventCount": 6, "target": 53, "text": "Tes"}`
   */
  change: (text: string) => {
    return {
      nativeEvent: { text, target: 0, eventCount: 0 },
    };
  },

  /**
   * Experimental values:
   * - iOS: `{"eventCount": 3, "key": "a", "target": 75}`
   * - Android: `{"key": "a"}`
   */
  keyPress: (key: string) => {
    return {
      nativeEvent: { key },
    };
  },

  /**
   * Experimental values:
   * - iOS: `{"eventCount": 4, "target": 75, "text": "Test"}`
   * - Android: `{"target": 53, "text": "Test"}`
   */
  submitEditing: (text: string) => {
    return {
      nativeEvent: { text, target: 0 },
    };
  },

  /**
   * Experimental values:
   * - iOS: `{"eventCount": 4, "target": 75, "text": "Test"}`
   * - Android: `{"target": 53, "text": "Test"}`
   */
  endEditing: (text: string) => {
    return {
      nativeEvent: { text, target: 0 },
    };
  },

  /**
   * Experimental values:
   * - iOS: `{"selection": {"end": 4, "start": 4}, "target": 75}`
   * - Android: `{"selection": {"end": 4, "start": 4}}`
   */
  selectionChange: (start: number, end: number) => {
    return {
      nativeEvent: { selection: { start, end } },
    };
  },

  /**
   * Experimental values:
   * - iOS: `{"eventCount": 2, "previousText": "Te", "range": {"end": 2, "start": 2}, "target": 75, "text": "s"}`
   * - Android: `{"previousText": "Te", "range": {"end": 2, "start": 0}, "target": 53, "text": "Tes"}`
   */
  textInput: (text: string, previousText: string) => {
    return {
      nativeEvent: {
        text,
        previousText,
        range: { start: text.length, end: text.length },
        target: 0,
      },
    };
  },
};
