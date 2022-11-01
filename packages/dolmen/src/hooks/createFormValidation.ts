import { Accessor, createSignal, Setter } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

type FormTypeBase = Record<string, FormDataEntryValue>;

type ValidationPred = (fieldData: FormDataEntryValue, fieldName: string) => boolean;
type ValidationFn = (fieldData: FormDataEntryValue, fieldName: string) => string;
type FieldValidation = ValidationFn | { [errorCode: string]: ValidationPred };

export type ValidationSchema<FormType extends FormTypeBase> = {
  [name in keyof FormType]?: FieldValidation;
};

export type ValidationResult<FormType extends FormTypeBase> = {
  // Maps field name to error code.
  [name in keyof FormType]?: string;
};

/** Return value from `createFormValidation()`. */
export interface IFormResult<FormType extends FormTypeBase> {
  /** Map of field names to error codes. */
  errors: ValidationResult<FormType>;

  /** Validate the form and update the error map. Returns true on success. */
  validate: (formData: FormData) => boolean;

  /** Indicates whether we are in 'recovery' mode. This is initially false, and is set
      to true after a failed validation in handleSubmit. While this mode is enabled,
      validation happens continuously as the user types.
   */
  recovery: Accessor<boolean>;

  /** Explicitly set recovery mode. */
  setRecovery: Setter<boolean>;

  /** Properties to be passed to the form element. */
  formProps: {
    onInput: (e: InputEvent) => void;
    onSubmit: (e: SubmitEvent) => void;
  };
}

/** Create a new form validator. The validator attaches to the form element's onSubmit
    and onInput event handlers:

    ```ts
      // Declaring a type for the form is optional but useful.
      interface UserForm { firstName: string; lastName: string };

      const { errors, formProps } = createFormValidation<UserForm>({
        // Method 1: keys are error codes, values are boolean predicates
        firstName: {
          required: value => value.length > 0,
        },
        // Method 2: function returns error code or message
        lastName: value => value.length === 0 ? 'Last name is required' : undefined
      })

      return (
        <form {...formProps} onSubmit={handleSubmit} >
          <input type="text" name="firstName">
          <input type="text" name="lastName">
        </form>
      );
    ```

    The `errors` object is a Solid store whose keys are the names of the input fields
    that failed validation, and whose values are the validation error strings. The validation
    errors can either be text messages or error codes - the choice really depends on whether
    you want to i18n localize the messages eagerly (when the form is rendered) or lazily
    (as errors happen). A key will not be present if the corresponding field successfully
    validated.

    The initial validation occurs when the form tries to submit. Once a form has failed
    submitting because of validation errors, the validator goes into 'recovery mode' where
    validation checks run interactively as the user types.

    The schema is an object describing the set of fields in the form and how those fields
    should be checked. The keys of the maps are the field names (as given by the "name"
    attribute), and the keys of the schema are validation predicates. There are two forms:

    * **function predicate** - a function that accepts the field data and field name, and
      returns an error code.
    * **map predicate** - an object whose keys are error codes, and whose values are
      functions that return a boolean (true = validation successful, false = validation
      failed). The keys are checked in order, and the first function to return false
      sets the error code for that field to the key.

    @param schema The validation schema.
    @returns An object containing a callback and reactive variables representing the
      state of the validation.
 */
export function createFormValidation<FormType extends FormTypeBase>(
  schema: ValidationSchema<FormType>,
  onSubmit?: (e: SubmitEvent) => void
): IFormResult<FormType> {
  // Map of field names to error codes.
  const [errors, setErrors] = createStore<ValidationResult<FormType>>({});

  // 'recovery' means we've already submitted once and are trying to correct the errors.
  // This triggers real-time error checking as you type, which is not enabled initially.
  const [recovery, setRecovery] = createSignal(false);

  const checkField = (fieldData: FormDataEntryValue | null, fieldName: string): string | null => {
    if (fieldData === undefined || fieldData === null) {
      return 'no-such-field';
    }
    const validator = schema[fieldName];
    if (typeof validator === 'object') {
      for (const errorCode in validator) {
        const vfn = validator[errorCode];
        if (typeof vfn === 'function' && !vfn(fieldData, fieldName)) {
          return errorCode;
        }
      }
    } else if (typeof validator === 'function') {
      const errorCode = validator(fieldData, fieldName);
      if (typeof errorCode === 'string') {
        return errorCode;
      }
    }
    return null;
  };

  const checkForm = (formData: FormData): number => {
    const result: ValidationResult<FormType> = {};
    for (const fieldName in schema) {
      const errorCode = checkField(formData.get(fieldName), fieldName);
      if (errorCode) {
        result[fieldName] = errorCode;
      }
    }
    setErrors(() => result);
    return Object.keys(result).length;
  };

  return {
    recovery,
    setRecovery,

    /** Check the entire form for errors, return true if OK. */
    validate: (formData: FormData): boolean => {
      return checkForm(formData) === 0;
    },

    formProps: {
      /** Handle a submit event, validating the data. Calls `preventDefault()` on the
        event if errors are detected, and also switches into recovery mode.
     */
      onSubmit: (e: SubmitEvent) => {
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const errorCount = checkForm(formData);
        setRecovery(errorCount > 0);
        if (errorCount > 0) {
          // Prevent the submission from occurring.
          e.preventDefault();
        } else {
          onSubmit?.(e);
        }
      },

      onInput: (e: InputEvent) => {
        // TODO: Throttle events
        if (recovery()) {
          const fieldName = (e.target as HTMLInputElement).name;
          if (typeof fieldName === 'string') {
            setErrors(
              produce(errors => {
                const errorCode = checkField((e.target as HTMLInputElement).value, fieldName);
                if (errorCode) {
                  errors[fieldName as keyof FormType] = errorCode;
                } else {
                  delete errors[fieldName];
                  return errors;
                }
              })
            );
          }
        }
      },
    },

    errors,
  };
}
