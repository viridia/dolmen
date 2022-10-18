type Ref<T extends HTMLElement> = (ref: T) => void;

export const forkRef = <T extends HTMLElement>(refs: ReadonlyArray<Ref<T>>) => {
  return (ref: T) => refs.forEach(r => r(ref));
};
