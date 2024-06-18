import { PasswordsComplexityPass } from "./PasswordStrengthInput";

type ComplexPasswordErrors = {
  [key: number]: PasswordsComplexityPass;
}
type PasswordScoreAndCriteria = {
  errorMessages?: PasswordsComplexityPass[];
  allChecksPassed: boolean;
}
export const getPasswordScoreAndCriteria = (password: string): PasswordScoreAndCriteria => {

  if (!password) return { allChecksPassed: false};

  /**
   * all criteria checks
   */
  const checks: boolean[] = [
    // password length
    password.length > 8,
    // password has lowercase
    /[a-z]/.test(password),
    // password has uppercase
    /[A-Z]/.test(password),
    // password has number
    /\d/.test(password),
    // password has special character
    /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/.test(password),
  ];

  const errorMessages: ComplexPasswordErrors = {
    1: { pass: false, message: "Must be at least 8 characters" },
    2: { pass: false, message: "Must contain at least one lowercase letter" },
    3: { pass: false, message: "Must contain at least one uppercase letter" },
    4: { pass: false, message: "Must contain at least one number" },
    5: { pass: false, message: "Must contain at least one special character" },
  };

  let allChecksPassed: boolean = false;

  checks.forEach((check: boolean, index: number) => {
    if (errorMessages[index + 1]) {
      if (check) {
        errorMessages[index + 1] = { ...errorMessages[index + 1], pass: true };
        allChecksPassed = true;
      } else {
        allChecksPassed = false;
      }
    }
  })

  return { errorMessages: Object.values(errorMessages), allChecksPassed };
};
