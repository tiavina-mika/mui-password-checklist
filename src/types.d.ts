import { ReactNode } from "react";

export type CheckPasswordOptions = {
  minLength?: number;
  allowedSpecialChar?: string;
};

type DefaultErrorOption = Record<'minLength' | 'lowerCase' | 'upperCase' | 'number', PasswordsComplexityPass>;
type ErrorOption = DefaultErrorOption & Record<'specialCharacters', PasswordsComplexityPass>;

export type Check = {
  pass: boolean;
  key: keyof ErrorOption;
}
export type PasswordCheckListResult = {
  validationMessages: PasswordsComplexityPass[];
  allChecksPassed: boolean;
}

export type PasswordsComplexityPass = {
  pass: boolean;
  message: string;
  key?: string;
};

export type ValidationMessages = {
  minLength: string;
  lowerCase: string;
  upperCase: string;
  number: string;
  specialCharacters: string;
}

export type PasswordChecklistProps = {
  /**
   * class name for the input field
   */
  className?: string;
  /**
   * custom options for password validation
   */
  options?: CheckPasswordOptions;
  /**
   * custom icon for hiding the password
   */
  hidePasswordIcon?: ReactNode;
  /**
   * custom icon for showing the password
   */
  showPasswordIcon?: ReactNode;
  /**
   * custom validation messages for each password validation
   */
  validationMessages?: ValidationMessages;
};
