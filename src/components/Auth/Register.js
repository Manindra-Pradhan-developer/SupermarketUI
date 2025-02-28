// src/components/Auth/Register.js

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  // Initial form values
  const initialValues = {
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    mobileNumber: Yup.string()
      .required('Mobile number is required')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must be at least 10 digits')
      .max(15, 'Must be at most 15 digits'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  // Handle form submission
  const onSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      // Send a POST request to the registration endpoint
      await api.post('/auth/register', {
        email: values.email,
        mobileNumber: values.mobileNumber,
        password: values.password,
      });

      // Redirect to login page after successful registration
      navigate('/login');

      // Optionally, display a success message
      // e.g., toast.success('Registration successful! Please log in.');
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data) {
        // Assume the backend sends validation errors in response.data.errors
        const errors = error.response.data.errors;
        if (errors) {
          Object.keys(errors).forEach((field) => {
            setFieldError(field, errors[field]);
          });
        } else {
          // Display a general error message
          // e.g., toast.error('Registration failed. Please try again.');
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number:</label>
              <Field
                type="text"
                name="mobileNumber"
                id="mobileNumber"
                placeholder="Enter your mobile number"
              />
              <ErrorMessage
                name="mobileNumber"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                name="password"
                id="password"
                placeholder="Enter a password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <Field
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error"
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;