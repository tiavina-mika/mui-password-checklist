// import {describe, expect, test} from '@jest/globals';

import { getPasswordChecklist } from "../utils";

// ------------ default options ------------ //
describe('check password', () => {
  test('check min length', () => {
    const { allChecksPassed, errorMessages } = getPasswordChecklist('abcde')
    expect(allChecksPassed).toBe(false);
    const currentPassed = errorMessages.find((error) => error.key === 'lowerCase');
    expect(currentPassed?.pass).toBe(true);
  });

  test('check two passed check', () => {
    const { allChecksPassed, errorMessages } = getPasswordChecklist('abcde8')
    expect(allChecksPassed).toBe(false);
    const passedChecks = errorMessages.filter((error) => error.key && ['lowerCase', 'number'].includes(error.key));
    expect(passedChecks?.length).toBe(2);
  });

  test('check all checks passed', () => {
    const { allChecksPassed, errorMessages } = getPasswordChecklist('abcde8=F')
    expect(allChecksPassed).toBe(true);
    expect(errorMessages?.length).toBe(5);
  });
});
