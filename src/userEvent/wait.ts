// TODO move to config
const configDelay = 0;
const configAdvanceTimers = (_: number) => Promise.resolve();

export function wait() {
  const delay = configDelay;
  if (typeof delay !== 'number') {
    return;
  }

  return Promise.all([
    new Promise<void>((resolve) =>
      globalThis.setTimeout(() => resolve(), delay)
    ),
    configAdvanceTimers(delay),
  ]);
}
