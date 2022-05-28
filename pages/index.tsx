import React, { useState } from 'react';
import type { NextPage } from 'next'
import { Card, CardContent, Button, Box, Step, StepLabel, Stepper, Grid, CircularProgress } from '@material-ui/core';
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik'
import { TextField, CheckboxWithLabel } from 'formik-material-ui'
import { object, mixed, number } from 'yup'

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

const Home: NextPage = () => {
  return (
    <Card>
      <CardContent>
        <FormikStepper

          initialValues={{
            firstName: '',
            lastName: '',
            millionaire: false,
            money: 0,
            description: '',
          }}
          onSubmit={async (values) => {
            await sleep(3000);
            console.log('values', values)
          }}
        >

          <FormikStep label='General Info'>
            <Box paddingBottom={2} marginBottom={2}>
              <Field fullWidth name='firstName' component={TextField} label='First Name' />
            </Box>
            <Box paddingBottom={2} marginBottom={2}>
              <Field fullWidth name='lastName' component={TextField} label='Last Name' />
            </Box>
            <Box paddingBottom={2} marginBottom={2}>
              <Field name='millionaire' type='checkbox' component={CheckboxWithLabel} Label={{ label: 'I am a Millionaire' }} />
            </Box>
          </FormikStep>
          <FormikStep
            label='Bank Account'
            validationSchema={object({
              money: mixed().when('millionaire', {
                is: true,
                then: number().required().min(1_000_000, 'As a millionaire, you need to have min. 1M €'),
                otherwise: number().required()
              })
            })}
          >
            <Box paddingBottom={2} marginBottom={2}>
              <Field fullWidth name='money' type='number' component={TextField} label='All the money I have' />
            </Box>
          </FormikStep>
          <FormikStep label='More Info'>
            <Box paddingBottom={2} marginBottom={2}>
              <Field fullWidth name='description' component={TextField} label='Description' />
            </Box>
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  )
}

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchima'> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>
}

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>;
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  // console.log('children', currentChild.props.validationSchema)
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
          helpers.resetForm();
          // setStep(0);
        } else {
          setStep(s => s + 1);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete='off'>
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child) => (
              <Step key={child.props.label}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {currentChild}
          <Grid container spacing={2}>
            {step > 0 ?
              (
                <Grid item>
                  <Button disabled={isSubmitting} variant='contained' color='primary' onClick={() => setStep(s => s - 1)}
                  >
                    Back
                  </Button>
                </Grid>
              ) : null}
            <Grid item>
              <Button startIcon={isSubmitting ? <CircularProgress size='1rem' /> : null} disabled={isSubmitting} variant='contained' color='primary' type='submit'>{isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}</Button>
            </Grid>
          </Grid>
        </Form>

      )}
    </Formik >
  );
}



export default Home


