/** Interface that defines all possible keys. */
export interface KeyCodes {
  ShiftLeft?: boolean;
  ShiftRight?: boolean;
  ControlLeft?: boolean;
  ControlRight?: boolean;
  AltLeft?: boolean;
  AltRight?: boolean;
  MetaLeft?: boolean;
  MetaRight?: boolean;
  ModLeft?: boolean;
  ModRight?: boolean;
  ArrowLeft?: boolean;
  ArrowRight?: boolean;
  ArrowUp?: boolean;
  ArrowDown?: boolean;
  Digit0?: boolean;
  Digit1?: boolean;
  Digit2?: boolean;
  Digit3?: boolean;
  Digit4?: boolean;
  Digit5?: boolean;
  Digit6?: boolean;
  Digit7?: boolean;
  Digit8?: boolean;
  Digit9?: boolean;
  KeyA?: boolean;
  KeyB?: boolean;
  KeyC?: boolean;
  KeyD?: boolean;
  KeyE?: boolean;
  KeyF?: boolean;
  KeyG?: boolean;
  KeyH?: boolean;
  KeyI?: boolean;
  KeyJ?: boolean;
  KeyK?: boolean;
  KeyL?: boolean;
  KeyM?: boolean;
  KeyN?: boolean;
  KeyO?: boolean;
  KeyP?: boolean;
  KeyQ?: boolean;
  KeyR?: boolean;
  KeyS?: boolean;
  KeyT?: boolean;
  KeyU?: boolean;
  KeyV?: boolean;
  KeyW?: boolean;
  KeyX?: boolean;
  KeyY?: boolean;
  KeyZ?: boolean;
  Space?: boolean;
  Enter?: boolean;
  Escape?: boolean;
  BracketLeft?: boolean;
  BracketRight?: boolean;
  Slash?: boolean;
  Backslash?: boolean;
  Backspace?: boolean;
  Delete?: boolean;
  Comma?: boolean;
  Period?: boolean;
  Minus?: boolean;
  Equal?: boolean;
}

export type KeyCode = keyof KeyCodes;