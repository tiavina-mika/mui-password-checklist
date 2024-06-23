import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, FormProvider, Controller } from 'react-hook-form';

import z from 'zod';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import PasswordChecklist, { validatePasswordChecklist } from 'mui-password-checklist';

const schema = z.object({
  password: z.string()
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

type Input = z.infer<typeof schema>;

const WithHookForm = () => {
  const [values, setValues] = useState<Input | null>(null);
  console.log('values: ', values);

  const form = useForm<Input>({
    resolver: zodResolver(schema),
    defaultValues: { password: '' }

  });

  const { handleSubmit, control, formState  } = form;

  const handleFormSubmit: SubmitHandler<Input> = async values => {
    setValues(values);
  };

  return (
    <Stack spacing={2}>
      {/* form */}
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Stack spacing={2}>
            {/* password input */}
            <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <PasswordChecklist
                    {...field}
                    label="Password"
                    fullWidth
                    placeholder="Enter your password"
                    error={Boolean(formState?.errors?.password)}
                  />
                )}
              />
              {/* button */}
              <Button
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
};

export default WithHookForm;
