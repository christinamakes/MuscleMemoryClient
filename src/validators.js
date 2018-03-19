export const required = value => (value ? undefined : 'Required');

export const notEmpty = value => (value.trim() !== '' ? undefined : 'Field cannot be empty');

export const isTrimmed = value => (value.trim() === value ? undefined : 'Cannot start or end with whitespace');

export const length = length => value => {
  if (length.min && value.length < length.min) {
    return `Must be at least ${length.min} characters long`;
  }
  if (length.max && value.length > length.max) {
    return `Must not be longer than ${length.max} characters` 
  }
};

export const matches = field => (value, allValues) => 
  field in allValues && value.trim() === allValues[field].trim() ? undefined : 'Fields do not match';
