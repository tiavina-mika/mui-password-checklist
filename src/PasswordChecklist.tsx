import { ChangeEvent, forwardRef, useState } from 'react';

import { IconButton, TextFieldProps, TextField, Theme, useTheme, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import VisibilityOff from './icons/VisibilityOff';
import Visibility from './icons/Visibility';
import Check from './icons/Check';
import Close from './icons/Close';
import { PasswordStrengthInputProps, PasswordsComplexityPass } from './types';
import { getPasswordChecklist } from './utils';

const PasswordChecklist =  forwardRef<HTMLDivElement, PasswordStrengthInputProps & TextFieldProps>(({
  options,
  className,
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

    const result = getPasswordChecklist(value, errorMessages, options);
    const newErrors = result.errorMessages || [];
    setErrors(newErrors);

    rest.onChange?.(event);
  };

  return (
    <>
      {/* ------------------------------------------- */}
      {/* ---------------- text field --------------- */}
      {/* ------------------------------------------- */}
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
                  {/* ------ left icon ------ */}
                  {error.pass
                    ? <Check fill={theme.palette.success.main} />
                    : <Close fill={theme.palette.error.main} />
                  }
                </ListItemIcon>
                {/* ------ error message ------ */}
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
    </>
  );
});

export default PasswordChecklist;
