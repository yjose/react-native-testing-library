interface EventEntry {
  name: string;
  nativeEvent: any;
  event?: any;
}

export function createEventToolkit() {
  const events: EventEntry[] = [];
  const handleEvent = (name: string) => {
    return (event: any) => {
      const eventEntry: EventEntry = {
        name,
        nativeEvent: event?.nativeEvent,
      };

      if (!eventEntry?.nativeEvent) {
        eventEntry.event = event;
      }

      events.push(eventEntry);
    };
  };

  return { events, handleEvent };
}
