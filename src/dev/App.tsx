import { Container, ThemeProvider, createTheme } from '@mui/material';
import PasswordChecklist from '../PasswordChecklist';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <PasswordChecklist
          className='input'
          errorMessages={{
            minLength: 'Devrait contenir au moins 8 caractères',
            lowerCase: 'Devrait contenir au moins une lettre minuscule',
            upperCase: 'Devrait contenir au moins une lettre majuscule',
            number: 'Devrait contenir au moins un chiffre',
            specialCharacters: 'Devrait contenir au moins un caractère spécial',
          }}
        />
      </Container>
    </ThemeProvider>
  )
}

export default App
