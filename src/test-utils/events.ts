interface EventEntry {
  id: number;
  name: string;
  nativeEvent: any;
}

export function createEventToolkit() {
  let id = 0;
  const events: EventEntry[] = [];
  const handleEvent = (name: string) => {
    return (event: any) => {
      events.push({
        id,
        name,
        nativeEvent: event?.nativeEvent,
      });

      id += 1;
    };
  };

  return { events, handleEvent };
}
