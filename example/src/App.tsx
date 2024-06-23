import { Card, CardContent, Container, Tab, Tabs, ThemeProvider, Typography, createTheme } from '@mui/material';
import PasswordChecklist from 'mui-password-checklist';
import { ChangeEvent, useState, SyntheticEvent } from 'react';
import WithHookForm from './WithHookForm';

const tabs = [
  'Basic usage',
  'React Hook Form',
];

const theme = createTheme();

const App = () => {
  const [tab, setTab] = useState<number>(0);

  const [password, setPassword] = useState<string>('');

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* ---------------- tabs ---------------- */}
      <div className="flex justify-center items-center">
        <Tabs value={tab} onChange={handleChange} aria-label="tabs"sx={{ mb: 2 }}>
          {tabs.map((label, index) => (
            <Tab key={index} label={label} value={index} />
          ))}
        </Tabs>
      </div>

      {/* ------------- tabs panels ------------- */}
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        { /* --------- simple usage ------------- */}
        <Card sx={{ maxWidth: 400, pb: 2 }}>
          <CardContent >
            <div className="flex flex-col gap-2 mb-16 mt-2">
              <Typography variant="h5">mui-password-checklist</Typography>
              <Typography>Click on the input field and type a password to see the chack list</Typography>
            </div>
            {tab === 0 && (
              <PasswordChecklist
                value={password}
                onChange={handlePasswordChange}
                // override class name
                className='input'
                // override error messages
                validationMessages={{
                  minLength: 'Devrait contenir au moins 6 caractères',
                  lowerCase: 'Devrait contenir au moins une lettre minuscule',
                  upperCase: 'Devrait contenir au moins une lettre majuscule',
                  number: 'Devrait contenir au moins un chiffre',
                  specialCharacters: 'Devrait contenir au moins un caractère spécial',
                }}
                // override options
                options={{
                  minLength: 6,
                  allowedSpecialChar: "="
                }}
                // override TextFieldProps
                fullWidth
                placeholder="Enter your password"
              />
            )}
            { /* --------- react hook form ------------- */}
            {tab === 1 && (
              <WithHookForm />
            )}
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  )
}

export default App
