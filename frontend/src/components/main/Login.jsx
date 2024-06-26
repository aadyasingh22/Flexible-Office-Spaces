import React from 'react'
import { GoogleLogin } from 'react-google-login';
import LoginButton from 'react-google-login'
import useAppContext from '../../context/AppContext';
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const clientId = "687782592869-s1u1pnos5oo1hcdqevpcrg03qtcsvs8o.apps.googleusercontent.com";

function Login() {

  const { setLoggedIn } = useAppContext();

  const navigate = useNavigate();

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values, {resetForm}) => {
      console.log(values);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/authenticate`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(res.status);
      if (res.status === 200) {
        enqueueSnackbar('Signin successful', {
          variant: 'success',
          anchorOrigin: {
            horizontal: 'center',
            vertical: 'top'
          }
        })
        const data = await res.json();
        console.log(data);
        sessionStorage.setItem('user', JSON.stringify(data));
        setLoggedIn(true)
        resetForm();

        navigate('/main/browsespaces');

      } else {
        enqueueSnackbar('Something went wrong', {
          variant: 'error',
          anchorOrigin: {
            horizontal: 'center',
            vertical: 'top'
          }
        })
      }

    }
  });

  // const onSuccess = (res) => {
  //   console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
  // }

  // const onFaliure = (res) => {
  //   console.log("LOGIN FAILED! res: ", res);
  // }

  return (
    <div className='h-full bg-gray-400'> 


      
          {/* component */}
          {/* Container */}
          <div className="mx-auto">
            <div className="flex justify-center px-6 py-12">
              {/* Row */}
              <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                {/* Col */}
                <div
                  className="w-full h-full bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                  style={{
                    backgroundImage:
                      'url("https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")'
                  }}
                />
                {/* Col */}
                <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                  <h3 className="pt-4 text-2xl text-center">Sign In to Your Account!</h3>
                  <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={loginForm.handleSubmit}>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="email"
                        onChange={loginForm.handleChange} value={loginForm.values.email}
                        type="text"
                        placeholder="Your Email"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        onChange={loginForm.handleChange} value={loginForm.values.password}
                        type="password"
                        placeholder="******************"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        className="mr-2 leading-tight"
                        type="checkbox"
                        id="checkbox_id"
                      />
                      <label className="text-sm" htmlFor="checkbox_id">
                        Remember Me
                      </label>
                    </div>
                    <div className="mb-6 text-center">
                      <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Sign In
                      </button>
                    </div>
                    <hr className="mb-6 border-t" />
                    {/* <p className='text-sm text-center p-2'>Login using Google</p> */}
                    <div id='signInButton' className='text-center'>
                      {/* <GoogleLogin
                        clientId={clientId}
                        buttonText="Login"
                        onSuccess={onSuccess}
                        onFaliure={onFaliure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                      /> */}
                      <div>
                        <LoginButton />
                      </div>
                    </div>
                    <div className="text-center">
                      <a
                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                        href="#"
                      >
                        Create an Account!
                      </a>
                    </div>
                    <div className="text-center">
                      <a
                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                        href="#"
                      >
                        Forgot Password?
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

        export default Login;