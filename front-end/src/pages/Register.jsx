import { CgProfile } from 'react-icons/cg';
import { PiLockLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { IoMdMailOpen } from 'react-icons/io';
import { FaPhone } from 'react-icons/fa6';
import { SlCalender } from 'react-icons/sl';

function Register() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        className="flex justify-center items-center flex-col border-4 border-blue-300
        rounded-4xl p-8 w-96 md:w-md lg:w-lg shadow-xl bg-white/70 backdrop-blur-sm
        h-auto"
      >
        <CgProfile className="text-8xl text-blue-400 mb-4" />
        <h1 className="font-bold text-6xl text-blue-600 mb-6">Registreren</h1>

        {/* Naam label*/}
        <div className="w-72 md:w-80 mb-2">
          <label className="block mb-1 text-sm font-medium text-blue-700">
            Naam
          </label>

          {/* Voornaam */}
          <div
            className="flex items-center bg-blue-100 rounded-2xl px-4 py-3 mb-3
    focus-within:ring-2 focus-within:ring-blue-400 shadow-sm"
          >
            <CgProfile className="text-blue-400 text-2xl" />
            <div className="h-6 w-px bg-blue-300 mx-3" />
            <input
              type="text"
              placeholder="Voornaam"
              className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-blue-400"
            />
          </div>

          {/* Achternaam */}
          <div
            className="flex items-center bg-blue-100 rounded-2xl px-4 py-3
    focus-within:ring-2 focus-within:ring-blue-400 shadow-sm"
          >
            <CgProfile className="text-blue-400 text-2xl" />
            <div className="h-6 w-px bg-blue-300 mx-3" />
            <input
              type="text"
              placeholder="Achternaam"
              className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-blue-400"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4 w-72 md:w-80">
          <div className="flex-1 border-b-2 border-blue-400 shadow-sm" />
        </div>

        {/* E-mail */}
        <div className="w-72 md:w-80 mb-4">
          <label className="block mb-1 text-sm font-medium text-blue-700">
            E-mail
          </label>
          <div
            className="flex items-center bg-blue-100 rounded-2xl px-4 py-3
            focus-within:ring-2 focus-within:ring-blue-400 shadow-sm"
          >
            <IoMdMailOpen className="text-blue-400 text-2xl" />
            <div className="h-6 w-px bg-blue-300 mx-3" />
            <input
              type="email"
              placeholder="E-mail"
              className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-blue-400"
            />
          </div>
        </div>

        {/* Telefoonnummer */}
        <div className="w-72 md:w-80 mb-4">
          <label className="block mb-1 text-sm font-medium text-blue-700">
            Telefoonnummer
          </label>
          <div
            className="flex items-center bg-blue-100 rounded-2xl px-4 py-3
            focus-within:ring-2 focus-within:ring-blue-400 shadow-sm"
          >
            <FaPhone className="text-blue-400 text-2xl" />
            <div className="h-6 w-px bg-blue-300 mx-3" />
            <input
              type="tel"
              placeholder="Telefoonnummer"
              className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-blue-400"
            />
          </div>
        </div>

        {/* Geboortedatum */}
        <div className="w-72 md:w-80 mb-2">
          <label className="block mb-1 text-sm font-medium text-blue-700">
            Geboortedatum
          </label>
          <div
            className="flex items-center bg-blue-100 rounded-2xl px-4 py-3
            focus-within:ring-2 focus-within:ring-blue-400 shadow-sm"
          >
            <SlCalender className="text-blue-400 text-2xl" />
            <div className="h-6 w-px bg-blue-300 mx-3" />
            <input
              type="date"
              placeholder="Geboortedatum"
              className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-blue-400"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4 w-72 md:w-80">
          <div className="flex-1 border-b-2 border-blue-400 shadow-sm" />
        </div>

        {/* Wachtwoord */}
        <div className="w-72 md:w-80 mb-4">
          <label className="block mb-1 text-sm font-medium text-blue-700">
            Wachtwoord
          </label>
          <div
            className="flex items-center bg-blue-100 rounded-2xl px-4 py-3
            focus-within:ring-2 focus-within:ring-blue-400 shadow-sm"
          >
            <PiLockLight className="text-blue-400 text-2xl" />
            <div className="h-6 w-px bg-blue-300 mx-3" />
            <input
              type="password"
              placeholder="Wachtwoord"
              className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-blue-400"
            />
          </div>
        </div>

        {/* Bevestig wachtwoord */}
        <div className="w-72 md:w-80 mb-4">
          <label className="block mb-1 text-sm font-medium text-blue-700">
            Bevestig wachtwoord
          </label>
          <div
            className="flex items-center bg-blue-100 rounded-2xl px-4 py-3
            focus-within:ring-2 focus-within:ring-blue-400 shadow-sm"
          >
            <PiLockLight className="text-blue-400 text-2xl" />
            <div className="h-6 w-px bg-blue-300 mx-3" />
            <input
              type="password"
              placeholder="Bevestig wachtwoord"
              className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-blue-400"
            />
          </div>
        </div>

        <button
          className="mt-2 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white
          py-3 rounded-2xl transition-all shadow-md w-72 md:w-80"
        >
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
