import { ChangeEvent, ReactNode, forwardRef, useState } from 'react';

import { IconButton, TextFieldProps, TextField, Theme, useTheme, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import VisibilityOff from './icons/VisibilityOff';
import Visibility from './icons/Visibility';
import { getPasswordChecklist } from './utils';
import Check from './icons/Check';
import Close from './icons/Close';

type Strength ={
  label?: string;
  color?: string;
}
type Options = {
  tooWeak?: Strength;
  weak?: Strength;
  medium?: Strength;
  strong?: Strength;
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
  specialChar: string;
}

export type PasswordStrengthInputProps = {
  className?: string;
  options?: Options;
  inactiveColor?: string;
  barClassName?: string;
  strengthLabelClassName?: string;
  hidePasswordIcon?: ReactNode;
  showPasswordIcon?: ReactNode;
  errorMessages?: ErrorMessages;
};


const PasswordStrengthInput =  forwardRef<HTMLDivElement, PasswordStrengthInputProps & TextFieldProps>(({
  inactiveColor,
  options,
  className,
  barClassName,
  strengthLabelClassName,
  hidePasswordIcon,
  showPasswordIcon,
  errorMessages,
  ...rest
}, ref) => {
  const [errors, setErrors] = useState<PasswordsComplexityPass[]>([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const theme = useTheme();

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const result = getPasswordChecklist(value, errorMessages);
    console.log(value, result);
    const newErrors = result.errorMessages || [];
    setErrors(newErrors);

    rest.onChange?.(event);
  };

  return (
    <div>
      <TextField
        ref={ref}
        {...rest}
        className={className}
        type={showPassword ? 'text' : 'password'}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleShowPassword}
              edge="end"
            >
              {/* toggle eye icon */}
              {showPassword
                ? (hidePasswordIcon || <VisibilityOff />)
                : (showPasswordIcon || <Visibility />)
              }
            </IconButton>
          ),
        }}
      />

      {/* ------------------------------------------- */}
      {/* ------ password requirement checklist ----- */}
      {/* ------------------------------------------- */}
      {errors.length > 0 && (
        <List sx={{ p: 0, mt: 1 }}>
          {errors.map((error, index) => (
              <ListItem key={index} sx={{ padding: 0 }}>
                <ListItemIcon sx={{ minWidth: 24, '& svg': { width: 18 } }}>
                  {/* ------ icon ------ */}
                  {error.pass
                    ? <Check fill={theme.palette.success.main} />
                    : <Close fill={theme.palette.error.main} />
                  }
                </ListItemIcon>
                {/* ------ label ------ */}
                <ListItemText
                  sx={{ color: (theme: Theme) => error.pass
                    ? theme.palette.success.main
                    : theme.palette.error.main
                  }}
                >
                  {error.message}
                </ListItemText>
              </ListItem>
            )
          )}
        </List>
      )}
    </div>
  );
});

export default PasswordStrengthInput;
