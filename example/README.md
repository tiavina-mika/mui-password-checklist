# mui-password-checklist

<p align="left">
A <a href="https://mui.com/material-ui/getting-started/overview/">Material-UI</a> password input with list of password validation steps or conditions that should be fulfilled.
</p>

## Demo

- **[CodeSandbox demo](https://codesandbox.io/s/github/tiavina-mika/mui-password-checklist-demo)**
- **[Live demo](https://mui-password-checklist.netlify.app/)**

<br />

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

### Using it with Zod and React Hook Form
Use the `validatePasswordChecklist` function to check if all rules are respected.

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, FormProvider, Controller } from 'react-hook-form';
import z from 'zod';
import PasswordChecklist, { validatePasswordChecklist } from 'mui-password-checklist';

const schema = z.object({
  password: z.string()
  .max(64, "Should not exceed 64 characters")
  .superRefine((value: string, ctx: any) => {
    const { allChecksPassed } = validatePasswordChecklist(value);
    // no need to trigger the error if the password rules are met
    if (allChecksPassed) return;

    ctx.addIssue({
      code: "custom",
      message: "Should contain at least 8 characters, one lowercase, one uppercase, one number, and one special character",
    });
  })
});

type FormValues = z.infer<typeof schema>;

const SignUpForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { handleSubmit, control, formState  } = form;

  const handleFormSubmit: SubmitHandler<FormValues> = async values => {
    console.log('values: ', values);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <PasswordChecklist
              {...field}
              error={Boolean(formState?.errors?.password)}
              // display the error message only if the error is not a custom one
              helperText={formState?.errors?.password?.type !== 'custom' ? formState?.errors?.password?.message : ''}
            />
          )}
        />
        <button type="submit">
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

export default SignUpForm;

```

See [`here`](https://github.com/tiavina-mika/mui-password-checklist/tree/main/example) for more examples that use `PasswordChecklist`.

## Props

|Props |Type                          | Default value                         | Description |
|----------------|-------------------------------|-----------------------------|-----------------------------|
|options|`CheckPasswordOptions`|null|Override colors and labels of each strength
|validationMessages|`ValidationMessages`|null| Override each password validation massages
|className|`string`|empty|TextField class name
|hidePasswordIcon|`ReactNode`|null|Custom icon for showing the password
|hidePasswordIcon|`ReactNode`|null|Custom icon for hiding the password
|...otherProps|`TextFieldProps`|null|All Material UI `TextField` props

## Types

#### ValidationMessages

|Name |Type                          | Description |
|----------------|-------------------------------|-----------------------------
|minLength|`string`|Message to display for the minimum required password length
|lowerCase|`string`|Message to display for the lowercase validation
|upperCase|`string`|Message to display for the uppercase validation
|number|`string`|Message to display for the number validation
|specialCharacters|`string`|Message to display for the required special characters

#### CheckPasswordOptions

|Name |Type            |Default value                          | Description |
|----------------|-------------------------------|-------------------------------|-----------------------------
|minLength|`number`|8|Override the minimum required password length
|allowedSpecialChar|`string`|!@#$%^&*(),.?\":{}<>\\[\\]\\\\/`~;'_+=-|Override the allowed special characters

<br />

## Contributing

Get started [here](https://github.com/tiavina-mika/mui-password-checklist/blob/main/CONTRIBUTING.md).
