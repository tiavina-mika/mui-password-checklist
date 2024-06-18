import { Container, ThemeProvider, createTheme } from '@mui/material';
import PasswordStrengthInput from '../PasswordStrengthInput';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <PasswordStrengthInput
          className='input'
          errorMessages={{
            minLength: 'Devrait contenir au moins 8 caractères',
            lowerCase: 'Devrait contenir au moins une lettre minuscule',
            upperCase: 'Devrait contenir au moins une lettre majuscule',
            number: 'Devrait contenir au moins un chiffre',
            specialChar: 'Devrait contenir au moins un caractère spécial',
          }}
          options={{
            tooWeak: {
              label: 'Too weak 2',
              color: 'red',
            },
            weak: {
              label: 'Weak 2',
              color: 'yellow',
            },
            medium: {
              label: 'Medium 2',
              color: 'green',
            },
            strong: {
              label: 'Strong 2',
              color: 'blue'
            },
          }}
        />
      </Container>
    </ThemeProvider>
  )
}

export default App
