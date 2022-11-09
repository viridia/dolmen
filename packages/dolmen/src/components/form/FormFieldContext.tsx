import { Accessor, createContext } from 'solid-js';

export type Severity = 'warning' | 'error' | 'success' | 'info';

export interface IInputAriaAttrs {
  'aria-labelledby'?: string,
  'aria-describedby'?: string,
  'aria-invalid'?: boolean,
  'aria-errormessage'?: string,
}

export interface IFormFieldState {
  ariaProps: Accessor<IInputAriaAttrs>;
}

export const FormFieldContext = createContext<IFormFieldState>();
