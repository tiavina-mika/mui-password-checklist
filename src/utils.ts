import { ErrorMessages, PasswordsComplexityPass } from "./PasswordChecklist";

export type CheckPasswordOptions = {
  minLength?: number;
  allowedSpecialChar?: string;
};

type DefaultErrorOption = Record<'minLength' | 'lowerCase' | 'upperCase' | 'number', PasswordsComplexityPass>;
type ErrorOption = DefaultErrorOption & Record<'specialCharacters', PasswordsComplexityPass>;

type Checks = {
  pass: boolean;
  key: keyof ErrorOption;
}
type PasswordCheckList = {
  errorMessages: PasswordsComplexityPass[];
  allChecksPassed: boolean;
}

export const getPasswordChecklist = (password: string, message?: ErrorMessages, options?: CheckPasswordOptions): PasswordCheckList => {
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

  if (!password) return { allChecksPassed: false, errorMessages: [] };

  /**
   * all criteria checks
   */
  const checks: Checks[] = [
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

  const errorMessages: DefaultErrorOption = {
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

    (errorMessages as ErrorOption).specialCharacters = { pass: false, message: specialCharacters };
  }

  let allChecksPassed: boolean = false;

  checks.forEach((check: Checks) => {
    if ((errorMessages as ErrorOption)[check.key]) {
      // check if the password passes the criteria
      if (check.pass) {
        (errorMessages as ErrorOption)[check.key] = {
          ...(errorMessages as ErrorOption)[check.key],
          pass: true,
          key: check.key
        };
        allChecksPassed = true;
      } else {
        (errorMessages as ErrorOption)[check.key] = { ...(errorMessages as ErrorOption)[check.key], key: check.key };
        allChecksPassed = false;
      }
    }
  })

  return { errorMessages: Object.values(errorMessages), allChecksPassed };
};
