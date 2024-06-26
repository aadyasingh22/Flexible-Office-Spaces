import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Password is required')
    .matches('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).+$', 'Password is invalid'),
  c_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const Signup = () => {

  const signupForm = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      c_password: ''
    },

    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      resetForm();

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/add`, {
        method : 'POST',
        body : JSON.stringify(values),
        headers : {
          'Content-Type' : 'application/json'
        }
      });

      console.log(res.status);
      if (res.status === 200) {
        enqueueSnackbar('Signup successful', {
            variant: 'success',
            anchorOrigin: {
                horizontal: 'center',
                vertical: 'top'
            }
        })
    } else {
        enqueueSnackbar('Something went wrong', {
            variant: 'error',
            anchorOrigin: {
                horizontal: 'center',
                vertical: 'top'
            }
        })
    }
      
    // send values to backend
    },

    validationSchema: SignupSchema
  });

    return (
        <div className="h-full bg-gray-400 dark:bg-gray-900">
  <div className="mx-auto">
    <div className="flex justify-center px-6 py-12">
      <div className="w-full xl:w-3/4 lg:w-11/12 flex">
        <div
          className="w-full h-auto bg-gray-400 dark:bg-gray-800 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
          style={{
            backgroundImage:
              'url("https://cdn.pixabay.com/photo/2017/03/28/12/06/chairs-2181916_1280.jpg")'
          }}
        />
        <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
          <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
            Create an Account!
          </h3>
          <form className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded" onSubmit={signupForm.handleSubmit}>
            <div className="mb-4 md:flex md:justify-between">
              <div className="mb-4 md:mr-2 md:mb-0">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <span style={{ fontSize: 10, marginLeft: 10, color: 'red' }}>{signupForm.errors.firstName}</span>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="firstName"
                  onChange={signupForm.handleChange} value={signupForm.values.firstName}
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div className="md:ml-2">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <span style={{ fontSize: 10, marginLeft: 10, color: 'red' }}>{signupForm.errors.lastName}</span>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="lastName"
                  onChange={signupForm.handleChange} value={signupForm.values.lastName}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                htmlFor="email"
              >
                Email
              </label>
              <span style={{ fontSize: 10, marginLeft: 10, color: 'red' }}>{signupForm.errors.email}</span>
              <input
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                onChange={signupForm.handleChange} value={signupForm.values.email}
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="mb-4 md:flex md:justify-between">
              <div className="mb-4 md:mr-2 md:mb-0">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                  htmlFor="password"
                >
                  Password
                </label>
                <span style={{ fontSize: 10, marginLeft: 10, color: 'red' }}>{signupForm.errors.password}</span>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="password"
                  onChange={signupForm.handleChange} value={signupForm.values.password}
                  type="password"
                  placeholder="******************"
                />
              </div>
              <div className="md:ml-2">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                  htmlFor="c_password"
                >
                  Confirm Password
                </label>
                <span style={{ fontSize: 10, marginLeft: 10, color: 'red' }}>{signupForm.errors.c_password}</span>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="c_password"
                  onChange={signupForm.handleChange} value={signupForm.values.c_password}
                  type="password"
                  placeholder="******************"
                />
              </div>
            </div>
            <div className="mb-6 text-center">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register Account
              </button>
            </div>
            <hr className="mb-6 border-t" />
            <div className="text-center">
              <a
                className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
            <div className="text-center">
              <a
                className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                href="./index.html"
              >
                Already have an account? Login!
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
    )
}

export default Signup