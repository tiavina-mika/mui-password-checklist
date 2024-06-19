import { CheckPasswordOptions } from "check-password-complexity";
import { Check, DefaultErrorOption, ValidationMessages, ErrorOption, PasswordCheckListResult } from "./types";

export const getPasswordChecklist = (password: string, message?: ValidationMessages, options?: CheckPasswordOptions): PasswordCheckListResult => {
  // -------------- default options -------------- //
  const passwordMinLength = options?.minLength || 8;
  const allowedSpecialChar = options?.allowedSpecialChar || "!@#$%^&*(),.?\":{}|<>\\[\\]\\\\/`~;'_+=-";

  // ----------- default error messages ---------- //
  const {
    minLength = `Must be at least ${passwordMinLength} characters`,
    lowerCase = 'Must contain at least one lowercase letter',
    upperCase = 'Must contain at least one uppercase letter',
    number = 'Must contain at least one number',
    specialCharacters = 'Must contain at least one special character'
  } = message || {};

  if (!password) return { allChecksPassed: false, validationMessages: [] };

  /**
   * all criteria checks
   */
  const checks: Check[] = [
    // password length
    {
      pass: password.length >= passwordMinLength,
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
  ];

  const validationMessages: DefaultErrorOption = {
    minLength: { pass: false, message: minLength },
    lowerCase: { pass: false, message: lowerCase },
    upperCase: { pass: false, message: upperCase },
    number: { pass: false, message: number },
  };

  // password has special character
  if (allowedSpecialChar) {
    checks.push({
      pass: new RegExp(`[${allowedSpecialChar}]`).test(password),
      key: "specialCharacters",
    });

    (validationMessages as ErrorOption).specialCharacters = { pass: false, message: specialCharacters };
  }

  let allChecksPassed: boolean = false;

  checks.forEach((check: Check) => {
    if ((validationMessages as ErrorOption)[check.key]) {
      // check if the password passes the criteria
      if (check.pass) {
        (validationMessages as ErrorOption)[check.key] = {
          ...(validationMessages as ErrorOption)[check.key],
          pass: true,
          key: check.key
        };
        allChecksPassed = true;
      } else {
        (validationMessages as ErrorOption)[check.key] = { ...(validationMessages as ErrorOption)[check.key], key: check.key };
        allChecksPassed = false;
      }
    }
  })

  return { validationMessages: Object.values(validationMessages), allChecksPassed };
};
