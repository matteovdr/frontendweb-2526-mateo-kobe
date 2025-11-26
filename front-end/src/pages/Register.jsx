import { CgProfile } from 'react-icons/cg';
import { PiLockLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex justify-center items-center flex-col border-4 border-blue-300
      rounded-4xl p-8 w-96 md:w-md lg:w-lg shadow-xl bg-white/70 backdrop-blur-sm
      h-auto">
        <CgProfile className="text-8xl text-blue-400 mb-4" />
        <h1 className="font-bold text-6xl text-blue-600 mb-6">Registreren</h1>

        <div className="flex items-center bg-blue-100 rounded-2xl mb-4 w-72 md:w-80 px-4 py-3
        focus-within:ring-2 focus-within:ring-blue-400 shadow-sm">
          <CgProfile className="text-blue-400 text-2xl" />
          <div className="h-6 w-px bg-blue-300 mx-3"></div>
          <input
            type="text"
            placeholder="Volledige naam"
            className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-blue-400"
          />
        </div>

        <div className="flex items-center bg-blue-100 rounded-2xl mb-4 w-72 md:w-80 px-4 py-3
        focus-within:ring-2 focus-within:ring-blue-400 shadow-sm">
          <CgProfile className="text-blue-400 text-2xl" />
          <div className="h-6 w-px bg-blue-300 mx-3"></div>
          <input
            type="email"
            placeholder="Email"
            className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-blue-400"
          />
        </div>

        <div className="flex items-center bg-blue-100 rounded-2xl w-72 md:w-80 px-4 py-3
        focus-within:ring-2 focus-within:ring-blue-400 shadow-sm mb-4">
          <PiLockLight className="text-blue-400 text-2xl" />
          <div className="h-6 w-px bg-blue-300 mx-3"></div>
          <input
            type="password"
            placeholder="Wachtwoord"
            className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-blue-400"
          />
        </div>

        <div className="flex items-center bg-blue-100 rounded-2xl w-72 md:w-80 px-4 py-3
        focus-within:ring-2 focus-within:ring-blue-400 shadow-sm mb-4">
          <PiLockLight className="text-blue-400 text-2xl" />
          <div className="h-6 w-px bg-blue-300 mx-3"></div>
          <input
            type="password"
            placeholder="Bevestig wachtwoord"
            className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-blue-400"
          />
        </div>

        <button className="mt-5 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white
        py-3 rounded-2xl transition-all shadow-md w-72 md:w-80">
          Registreren
        </button>

        <div className="flex flex-col items-center mt-6 text-sm">
          <p className="text-black">
            Heb je al een account?{' '}
            <Link to="/login" className="font-semibold text-blue-600 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;