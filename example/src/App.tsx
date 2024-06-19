import { Card, CardContent, Container, ThemeProvider, Typography, createTheme } from '@mui/material';
import PasswordChecklist from 'mui-password-checklist';
import { ChangeEvent, useState } from 'react';

const theme = createTheme();

const App = () => {
  const [password, setPassword] = useState<string>('');

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <Card sx={{ maxWidth: 400, pb: 2 }}>
          <CardContent >
            <div className="flex flex-col gap-2 mb-16 mt-2">
              <Typography variant="h5">mui-password-checklist</Typography>
              <Typography>Click on the input field and type a password to see the chack list</Typography>
            </div>
            <PasswordChecklist
              value={password}
              onChange={handlePasswordChange}
              // override class name
              className='input'
              // override error messages
              errorMessages={{
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
            />
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  )
}

export default App
