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
export type PasswordCheckList = {
  errorMessages: PasswordsComplexityPass[];
  allChecksPassed: boolean;
}

export type PasswordsComplexityPass = {
  pass: boolean;
  message: string;
  key?: string;
};

export type ErrorMessages = {
  minLength: string;
  lowerCase: string;
  upperCase: string;
  number: string;
  specialCharacters: string;
}

export type PasswordStrengthInputProps = {
  className?: string;
  options?: CheckPasswordOptions;
  hidePasswordIcon?: ReactNode;
  showPasswordIcon?: ReactNode;
  errorMessages?: ErrorMessages;
};
