import { CgProfile } from 'react-icons/cg';
import { PiLockLight } from 'react-icons/pi';

function Login() {
  return (
    <>
      <div className="flex justify-center items-center bg-blue-100 min-h-screen">
        <div className="flex justify-center items-center flex-col border-4 border-blue-300
        rounded-4xl p-8 w-96 md:w-[28rem] lg:w-[32rem] shadow-xl bg-white/70 backdrop-blur-sm
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
          <button className="mt-5 bg-blue-500 hover:bg-blue-600 text-white
          font-semibold py-3 rounded-2xl transition-all shadow-md cursor-pointer w-72 md:w-80">
            Inloggen
          </button>

          {/* Links */}
          <div className="flex flex-col items-center mt-6 text-sm">
            <a href="#" className="text-blue-600 underline mb-2">
              Wachtwoord vergeten?
            </a>
            <p className="text-black">
              Heb je nog geen account?{' '}
              <a href="/signup" className="font-semibold text-blue-600 underline">
                Registreer
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;