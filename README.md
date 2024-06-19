# mui-password-checklist

<p align="center">

A <a href="https://mui.com/material-ui/getting-started/overview/">Material-UI</a> password input with list of password validation steps or conditions that should be fulfilled.
</p>


![Gif](https://github.com/tiavina-mika/mui-password-checklist/blob/main/screenshots/example.gif)

## Installation

```shell

npm install mui-password-checklist

```
or
```shell

yarn add mui-password-checklist

```
Please note that [`@mui/material`](https://mui.com/material-ui/getting-started/installation/) (and their `@emotion/` peers) are peer dependencies, meaning you should ensure they are installed before installing `mui-password-checklist`.

```shell
npm install @mui/material @emotion/react @emotion/styled
```
or
```shell
yarn add @mui/material @emotion/react @emotion/styled
```

## Get started

### Simple usage
```tsx
import PasswordChecklist from 'mui-password-checklist';
import { useState, ChangeEvent } from "react";

function App() {
  const [password, setPassword] = useState<string>('');

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  return (
    <PasswordChecklist value={password} onChange={handlePasswordChange} />
  );
}
```

### Override
```tsx
    <PasswordChecklist
      // override class name
      className='border-1 border-gray-500'
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
```

### Custom icons

```tsx
  <PasswordChecklist
    hidePasswordIcon={<EyeOff />}
    showPasswordIcon={<EyeOn />}
  />
```


### Material-UI TextField props

```tsx
  <PasswordChecklist
    placeholder="Enter your password"
    // ...other mui TextField props
  />
```

See [`here`](https://github.com/tiavina-mika/mui-password-checklist/tree/main/example) for more examples that use `PasswordChecklist`.

## Props

|props |type                          | Default value                         | Description |
|----------------|-------------------------------|-----------------------------|-----------------------------|
|options|`Options`|null|Options to override colors and labels of each strength
|barClassName|`string`|empty|custom class name of the each bar indicator
|strengthLabelClassName|`string`|empty|custom class name of the strength label
|className|`string`|empty|custom class name of text input
|hidePasswordIcon|`ReactNode`|null|custom icon to hide password
|hidePasswordIcon|`ReactNode`|null|custom icon to show password
|...otherProps|`TextFieldProps`|null|all mui `TextField` props

## Contributing

Get started [here](https://github.com/tiavina-mika/mui-password-checklist/blob/main/CONTRIBUTING.md).
