// import {describe, expect, test} from '@jest/globals';

import { validatePasswordChecklist } from "validate-password-checklist";

// ------------ default options ------------ //
describe('check password', () => {
  test('check min length', () => {
    const { allChecksPassed, validationMessages } = validatePasswordChecklist('abcde')
    expect(allChecksPassed).toBe(false);
    const currentPassed = validationMessages.find((error) => error.key === 'lowerCase');
    expect(currentPassed?.passed).toBe(true);
  });

  test('check two passed check', () => {
    const { allChecksPassed, validationMessages } = validatePasswordChecklist('abcde8')
    expect(allChecksPassed).toBe(false);
    const passedChecks = validationMessages.filter((error) => error.key && ['lowerCase', 'number'].includes(error.key));
    expect(passedChecks?.length).toBe(2);
  });

  test('check all checks passed', () => {
    const { allChecksPassed, validationMessages } = validatePasswordChecklist('abcde8=F')
    expect(allChecksPassed).toBe(true);
    expect(validationMessages?.length).toBe(5);
  });
});
