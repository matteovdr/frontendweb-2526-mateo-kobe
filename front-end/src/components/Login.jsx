import { GoogleLogin } from '@react-oauth/google';
import { CgProfile } from 'react-icons/cg';
import { PiLockLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';

function Login() {
  const handleSuccess = (credentialResponse) => {
    console.log('Google login success:', credentialResponse);
  };

  const handleError = () => {
    console.log('Google login failed');
  };

  return (
 
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex justify-center items-center flex-col border-4 border-blue-300
        rounded-4xl p-8 w-96 md:w-md lg:w-lg shadow-xl bg-white/70 backdrop-blur-sm
        h-auto">
        <CgProfile className="text-8xl text-blue-400 mb-4" />
        <h1 className="font-bold text-6xl text-blue-600 mb-6">Login</h1>

        {/* Email/Username input */}
        <div className="flex items-center bg-blue-100 rounded-2xl mb-4 w-72 md:w-80 px-4 py-3
          focus-within:ring-2 focus-within:ring-blue-400 shadow-sm">
          <CgProfile className="text-blue-400 text-2xl" />
          <div className="h-6 w-px bg-blue-300 mx-3"></div>
          <input
            type="text"
            placeholder="Email of gebruikersnaam"
            className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-blue-400"
          />
        </div>

        {/* Wachtwoord input */}
        <div className="flex items-center bg-blue-100 rounded-2xl w-72 md:w-80 px-4 py-3
          focus-within:ring-2 focus-within:ring-blue-400 shadow-sm">
          <PiLockLight className="text-blue-400 text-2xl" />
          <div className="h-6 w-px bg-blue-300 mx-3"></div>
          <input
            type="password"
            placeholder="Wachtwoord"
            className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-blue-400"
          />
        </div>

        {/* Login button */}
        <button className="mt-5 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white
          py-3 rounded-2xl transition-all shadow-md w-72 md:w-80">
          Inloggen
        </button>

        {/* Divider */}
        <div className="flex items-center my-4 w-72 md:w-80">
          <div className="flex-1 border-b"></div>
          <span className="mx-3 text-gray-500 text-sm">of</span>
          <div className="flex-1 border-b"></div>
        </div>

        {/* Google Sign In */}
        <div
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
        </div>

        {/* Links */}
        <div className="flex flex-col items-center mt-6 text-sm">
          <Link to="/register" className="text-blue-600 underline mb-2">
            Wachtwoord vergeten?
          </Link>
          <p className="text-black">
            Heb je nog geen account?{' '}
            <Link to="/register" className="font-semibold text-blue-600 underline">
              Registreer
            </Link>
          </p>
        </div>
      </div>
    </div>
   
  );
}

export default Login;