import { ChangeEvent, forwardRef, useState } from 'react';

import { IconButton, TextFieldProps, TextField, Theme, useTheme, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import VisibilityOff from './icons/VisibilityOff';
import Visibility from './icons/Visibility';
import Check from './icons/Check';
import Close from './icons/Close';
import { PasswordChecklistProps } from './types';
import { validatePasswordChecklist, PasswordCheckListResult } from 'validate-password-checklist';

const PasswordChecklist =  forwardRef<HTMLDivElement, PasswordChecklistProps & TextFieldProps>(({
  options,
  className,
  hidePasswordIcon,
  showPasswordIcon,
  validationMessages,
  ...rest
}, ref) => {
  const [rules, setRules] = useState<PasswordCheckListResult['validationMessages']>([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const theme = useTheme();

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const result = validatePasswordChecklist(value, validationMessages, options);
    const newErrors = result.validationMessages || [];
    setRules(newErrors);

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
      {rules.length > 0 && (
        <List sx={{ p: 0, mt: 1 }}>
          {rules.map((error, index) => (
              <ListItem key={index} sx={{ padding: 0 }}>
                <ListItemIcon sx={{ minWidth: 24, '& svg': { width: 18 } }}>
                  {/* ------ left icon ------ */}
                  {error.passed
                    ? <Check fill={theme.palette.success.main} />
                    : <Close fill={theme.palette.error.main} />
                  }
                </ListItemIcon>
                {/* ------ error message ------ */}
                <ListItemText
                  sx={{ color: (theme: Theme) => error.passed
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
