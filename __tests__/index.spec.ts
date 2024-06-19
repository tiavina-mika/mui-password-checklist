// import {describe, expect, test} from '@jest/globals';

import { getPasswordChecklist } from "../src/utils";

// ------------ default options ------------ //
describe('check password', () => {
  test('check min length', () => {
    const { allChecksPassed, validationMessages } = getPasswordChecklist('abcde')
    expect(allChecksPassed).toBe(false);
    const currentPassed = validationMessages.find((error) => error.key === 'lowerCase');
    expect(currentPassed?.pass).toBe(true);
  });

  test('check two passed check', () => {
    const { allChecksPassed, validationMessages } = getPasswordChecklist('abcde8')
    expect(allChecksPassed).toBe(false);
    const passedChecks = validationMessages.filter((error) => error.key && ['lowerCase', 'number'].includes(error.key));
    expect(passedChecks?.length).toBe(2);
  });

  test('check all checks passed', () => {
    const { allChecksPassed, validationMessages } = getPasswordChecklist('abcde8=F')
    expect(allChecksPassed).toBe(true);
    expect(validationMessages?.length).toBe(5);
  });
});
