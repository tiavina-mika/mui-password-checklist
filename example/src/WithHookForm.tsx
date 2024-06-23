import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, FormProvider, Controller } from 'react-hook-form';

import z from 'zod';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import PasswordChecklist from 'mui-password-checklist';

const schema = z.object({
  password: z.string(),
});

type Input = z.infer<typeof schema>;

const WithHookForm = () => {
  const [values, setValues] = useState<Input | null>(null);
  console.log('values: ', values);

  const form = useForm<Input>({
    resolver: zodResolver(schema),
    defaultValues: { password: '' }

  });

  const { handleSubmit, control } = form;


  const handleFormSubmit: SubmitHandler<Input> = async values => {
    setValues(values);
  };

  return (
    <Stack spacing={2}>
      {/* form */}
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Stack spacing={2}>
            <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <PasswordChecklist
                    {...field}
                    label="Content"
                  />
                )}
              />
              {/* buttons */}
              <Stack direction="row" spacing={3}>
                <Button
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
            </Stack>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
};

export default WithHookForm;
