import * as yup from 'yup';

const signUpValidationSchema = yup.object().shape({
  fullname: yup.string().required('Full Name is required'),

  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),

  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,}$/,
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
    )
    .required('Password is required'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),

  mobile: yup
    .string()
    .matches(
      /^[0-9]{10}$/,
      'Enter a valid mobile username with exactly 10 numeric characters',
    )
    .required('Mobile username is required'),
});

export default signUpValidationSchema;
