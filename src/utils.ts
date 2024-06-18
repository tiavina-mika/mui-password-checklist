import { ErrorMessages, PasswordsComplexityPass } from "./PasswordStrengthInput";

type ComplexPasswordErrors = Record<'minLength' | 'lowerCase' | 'upperCase' | 'number' | 'specialChar', PasswordsComplexityPass>

type Checks = {
  pass: boolean;
  key: keyof ComplexPasswordErrors;
}
type PasswordCheckList = {
  errorMessages: PasswordsComplexityPass[];
  allChecksPassed: boolean;
}
export const getPasswordChecklist = (password: string, message?: ErrorMessages): PasswordCheckList => {
  const {
    minLength = "Must be at least 8 characters",
    lowerCase = "Must contain at least one lowercase letter",
    upperCase = "Must contain at least one uppercase letter",
    number = "Must contain at least one number",
    specialChar = "Must contain at least one special character"
  } = message || {};

  if (!password) return { allChecksPassed: false, errorMessages: [] };

  /**
   * all criteria checks
   */
  const checks: Checks[] = [
    // password length
    {
      pass: password.length >= 8,
      key: 'minLength'
    },
    // password has lowercase
    {
      pass: /[a-z]/.test(password),
      key: 'lowerCase'
    },
    // password has uppercase
    {
      pass: /[A-Z]/.test(password),
      key: 'upperCase'
    },
    // password has number
    {
      pass: /\d/.test(password),
      key: 'number'
    },
    // password has special character
    {
      pass: /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/.test(password),
      key: 'specialChar'
    }
  ];

  const errorMessages: ComplexPasswordErrors = {
    minLength: { pass: false, message: minLength },
    lowerCase: { pass: false, message: lowerCase },
    upperCase: { pass: false, message: upperCase },
    number: { pass: false, message: number },
    specialChar: { pass: false, message: specialChar },
  };

  let allChecksPassed: boolean = false;

  checks.forEach((check: Checks) => {
    if (errorMessages[check.key]) {
      if (check.pass) {
        errorMessages[check.key] = { ...errorMessages[check.key], pass: true, key: check.key };
        allChecksPassed = true;
      } else {
        errorMessages[check.key] = { ...errorMessages[check.key], key: check.key };
        allChecksPassed = false;
      }
    }
  })

  return { errorMessages: Object.values(errorMessages), allChecksPassed };
};
