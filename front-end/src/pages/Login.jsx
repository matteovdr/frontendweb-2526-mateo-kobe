import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { CgProfile } from 'react-icons/cg';
import { PiLockLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

const validationRules = {
  email: {
    required: 'E-mail is verplicht',
  },
  password: {
    required: 'Wachtwoord is verplicht',
    minLength: {
      value: 6,
      message: 'Wachtwoord moet minimaal 6 tekens lang zijn',
    },
  },
};

function Login() {
  const { error, loading, login } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();

  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleLogin = useCallback(
    async ({ email, password }) => {
      const loggedIn = await login(email, password);
      if (loggedIn) {
        const params = new URLSearchParams(search);
        navigate({
          pathname: params.get('redirect') || '/',
          replace: true,
        });
      }
    },
    [login, navigate, search],
  );

  return (
    <FormProvider {...methods}>
      <div className="flex items-center justify-center min-h-screen w-full">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex justify-center items-center flex-col border-4 border-blue-300
                     rounded-4xl p-8 w-96 md:w-md lg:w-lg shadow-xl bg-white/70 backdrop-blur-sm
                     h-auto"
        >
          <CgProfile className="text-8xl text-blue-400 mb-4" />
          <h1 className="font-bold text-6xl text-blue-600 mb-6">Login</h1>

          {/* globale fout van useAuth */}
          {error && (
            <p className="mb-2 text-red-600 text-sm">
              {String(error)}
            </p>
          )}

          {/* Email/Username input */}
          <div className="flex flex-col w-72 md:w-80 mb-4">
            <div className="flex items-center bg-blue-100 rounded-2xl px-4 py-3
                            focus-within:ring-2 focus-within:ring-blue-400 shadow-sm">
              <CgProfile className="text-blue-400 text-2xl" />
              <div className="h-6 w-px bg-blue-300 mx-3" />
              <input
                type="text"
                placeholder="Email of gebruikersnaam"
                {...register('email', validationRules.email)}
                data-cy="email_input"
                className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-blue-400"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Wachtwoord input */}
          <div className="flex flex-col w-72 md:w-80">
            <div className="flex items-center bg-blue-100 rounded-2xl px-4 py-3
                            focus-within:ring-2 focus-within:ring-blue-400 shadow-sm">
              <PiLockLight className="text-blue-400 text-2xl" />
              <div className="h-6 w-px bg-blue-300 mx-3" />
              <input
                type="password"
                placeholder="Wachtwoord"
                {...register('password', validationRules.password)}
                data-cy="password_input"
                className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-blue-400"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login + Cancel knoppen */}
          <div className="flex flex-col items-center mt-5 w-72 md:w-80 gap-2">
            <button
              type="submit"
              disabled={loading}
              data-cy="submit_btn"
              className="bg-blue-500 hover:bg-blue-600 disabled:opacity-60 cursor-pointer text-white
                         py-3 rounded-2xl transition-all shadow-md w-full"
            >
              Inloggen
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-200 hover:bg-gray-300 text-blue-700
                         py-3 rounded-2xl transition-all shadow-md w-full"
            >
              Annuleren
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-4 w-72 md:w-80">
            <div className="flex-1 border-b" />
            <span className="mx-3 text-gray-500 text-sm">of</span>
            <div className="flex-1 border-b" />
          </div>

          {/* Google Sign In */}
          {/* <div
            className="w-72 md:w-80 mt-1 flex justify-center"
            style={{ height: '46px' }}
          >
            <div className="w-full flex justify-center">
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                theme="outline"
                size="large"
                shape="rectangular"
              />
            </div>
          </div> */}

          {/* Links */}
          <div className="flex flex-col items-center mt-6 text-sm">
            <Link to="#" className="text-blue-600 underline mb-2">
              Wachtwoord vergeten?
            </Link>
            <p className="text-black">
              Heb je nog geen account?{' '}
              <Link to="/register" className="font-semibold text-blue-600 underline">
                Registreer
              </Link>
            </p>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

export default Login;
