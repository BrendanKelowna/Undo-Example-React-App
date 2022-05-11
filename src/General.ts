//* Types

//* Options
export const lag = true;
export const errors = true;

//* Helpers
export async function delay(milisec?: number) {
  if (!lag) return;
  if (!milisec) milisec = Math.random() * 1000;
  return new Promise<void>((resolve) => setTimeout(() => resolve(), milisec));
}
export function hasError(inOneHundred?: number) {
  if (!errors) return false;
  if (!inOneHundred) inOneHundred = 15;
  return Math.random() * 100 < inOneHundred;
}
