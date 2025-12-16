import {
  FormProvider,
  useForm,
} from 'react-hook-form';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import { CgProfile } from 'react-icons/cg';
import { PiLockLight } from 'react-icons/pi';
import { IoMdMailOpen } from 'react-icons/io';
import { FaPhone } from 'react-icons/fa6';
import { SlCalender } from 'react-icons/sl';

export default function Register() {
  const { error, loading, register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [userType, setUserType] = useState('lid');

  const methods = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const handleCancel = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const handleRegister = useCallback(
    async (formData) => {
      const { voornaam, achternaam, email, telefoon, geboorteDatum, password, beschrijving, ageGroup } = formData;
      const formattedDate =
        typeof geboorteDatum === 'string'
          ? geboorteDatum
          : geboorteDatum instanceof Date
            ? geboorteDatum.toISOString().split('T')[0]
            : '';
      const registrationData = {
        voornaam, 
        achternaam, 
        email, 
        telefoon,
        geboorteDatum: formattedDate,
        password,
        role: userType,
      };

      if (userType === 'leiding') {
        if (ageGroup && ageGroup.trim()) {
          registrationData.ageGroup = ageGroup;
        }
        if (beschrijving && beschrijving.trim()) {
          registrationData.beschrijving = beschrijving;
        }
      }

      const ok = await registerUser(registrationData);

      if (ok) {
        navigate('/', { replace: true });
      }
    },
    [registerUser, navigate, userType],
  );

  const validationRules = useMemo(
    () => ({
      voornaam: { required: 'Voornaam is verplicht' },
      achternaam: { required: 'Achternaam is verplicht' },
      email: {
        required: 'E-mail is verplicht',
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'Ongeldig e-mailadres',
        },
      },
      telefoon: { required: 'Telefoonnummer is verplicht' },
      geboorteDatum: {
        required: 'Geboortedatum is verplicht',
        validate: (value) => {
          if (!value) return true;
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          if (selectedDate >= today) {
            return 'Geboortedatum kan niet vandaag of in de toekomst liggen';
          }
          
          // Calculate age
          let age = today.getFullYear() - selectedDate.getFullYear();
          const monthDiff = today.getMonth() - selectedDate.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
            age--;
          }
          
          // Check minimum age based on user type
          const minAge = userType === 'leiding' ? 18 : 6;
          const minAgeMessage = userType === 'leiding' 
            ? 'Je moet minimaal 18 jaar oud zijn voor leiding'
            : 'Je moet minimaal 6 jaar oud zijn';
          
          return age >= minAge || minAgeMessage;
        },
      },
      password: {
        required: 'Wachtwoord is verplicht',
        minLength: {
          value: 8,
          message: 'Wachtwoord moet minimaal 8 tekens lang zijn',
        },
      },
      confirmPassword: {
        required: 'Bevestig je wachtwoord',
        validate: (value) => {
          const password = getValues('password');
          return password === value || 'Wachtwoorden komen niet overeen';
        },
      },
      ageGroup: userType === 'leiding' ? { required: 'Leeftijdsgroep is verplicht voor leiding' } : {},
      beschrijving: userType === 'leiding' ? { required: 'Beschrijving is verplicht voor leiding' } : {},
    }),
    [getValues, userType],
  );

  return (
    <FormProvider {...methods}>
      <div className="flex justify-center items-center min-h-screen">
        <form
          noValidate
          onSubmit={handleSubmit(handleRegister)}
          className="flex justify-center items-center flex-col border-4 border-blue-300
                     rounded-4xl p-8 w-96 md:w-md lg:w-lg shadow-xl bg-white/70 backdrop-blur-sm
                     h-auto"
        >
          {error && (
            <p className="mb-2 text-red-600 text-sm">
              {String(error)}
            </p>
          )}

          <CgProfile className="text-8xl text-blue-400 mb-4" />
          <h1 className="font-bold text-6xl text-blue-600 mb-6">Registreren</h1>

          {/* USER TYPE DROPDOWN */}
          <div className="w-72 md:w-80 mb-4">
            <label className="block mb-1 text-sm font-medium text-blue-700">
              Soort account
            </label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              data-cy="usertype_select"
              className="w-full bg-blue-100 rounded-2xl px-4 py-3
                         focus:ring-2 focus:ring-blue-400 shadow-sm text-gray-700 outline-none"
            >
              <option value="lid">Lid</option>
              <option value="leiding">Leiding</option>
            </select>
          </div>

          {/* Divider */}
          <div className="flex items-center my-4 w-72 md:w-80">
            <div className="flex-1 border-b-2 border-blue-400 shadow-sm" />
          </div>

          {/* NAAM */}
          <div className="w-72 md:w-80 mb-2">
            <label className="block mb-1 text-sm font-medium text-blue-700">
              Naam
            </label>

            {/* Voornaam */}
            <div className="flex items-center bg-blue-100 rounded-2xl px-4 py-3 mb-1
                            focus-within:ring-2 focus-within:ring-blue-400 shadow-sm">
              <CgProfile className="text-blue-400 text-2xl" />
              <div className="h-6 w-px bg-blue-300 mx-3" />
              <input
                type="text"
                placeholder="Voornaam"
                {...register('voornaam', validationRules.voornaam)}
                data-cy="voornaam_input"
                className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-blue-400"
              />
            </div>
            {errors.voornaam && (
              <p className="text-red-500 text-xs mt-1">
                {errors.voornaam.message}
              </p>
            )}

            {/* Achternaam */}
            <div className="flex items-center bg-blue-100 rounded-2xl px-4 py-3 mt-2
                            focus-within:ring-2 focus-within:ring-blue-400 shadow-sm">
              <CgProfile className="text-blue-400 text-2xl" />
              <div className="h-6 w-px bg-blue-300 mx-3" />
              <input
                type="text"
                placeholder="Achternaam"
                {...register('achternaam', validationRules.achternaam)}
                data-cy="achternaam_input"
                className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-blue-400"
              />
            </div>
            {errors.achternaam && (
              <p className="text-red-500 text-xs mt-1">
                {errors.achternaam.message}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center my-4 w-72 md:w-80">
            <div className="flex-1 border-b-2 border-blue-400 shadow-sm" />
          </div>

          {/* E-MAIL */}
          <div className="w-72 md:w-80 mb-4">
            <label className="block mb-1 text-sm font-medium text-blue-700">
              E-mail
            </label>
            <div className="flex items-center bg-blue-100 rounded-2xl px-4 py-3
                            focus-within:ring-2 focus-within:ring-blue-400 shadow-sm">
              <IoMdMailOpen className="text-blue-400 text-2xl" />
              <div className="h-6 w-px bg-blue-300 mx-3" />
              <input
                type="email"
                placeholder="E-mail"
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

          {/* TELEFOON */}
          <div className="w-72 md:w-80 mb-4">
            <label className="block mb-1 text-sm font-medium text-blue-700">
              Telefoonnummer
            </label>
            <div className="flex items-center bg-blue-100 rounded-2xl px-4 py-3
                            focus-within:ring-2 focus-within:ring-blue-400 shadow-sm">
              <FaPhone className="text-blue-400 text-2xl" />
              <div className="h-6 w-px bg-blue-300 mx-3" />
              <input
                type="tel"
                placeholder="Telefoonnummer"
                {...register('telefoon', validationRules.telefoon)}
                data-cy="telefoon_input"
                className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-blue-400"
              />
            </div>
            {errors.telefoon && (
              <p className="text-red-500 text-xs mt-1">
                {errors.telefoon.message}
              </p>
            )}
          </div>

          {/* GEBOORTEDATUM */}
          <div className="w-72 md:w-80 mb-2">
            <label className="block mb-1 text-sm font-medium text-blue-700">
              Geboortedatum
            </label>
            <div className="flex items-center bg-blue-100 rounded-2xl px-4 py-3
                            focus-within:ring-2 focus-within:ring-blue-400 shadow-sm">
              <SlCalender className="text-blue-400 text-2xl" />
              <div className="h-6 w-px bg-blue-300 mx-3" />
              <input
                type="date"
                {...register('geboorteDatum', validationRules.geboorteDatum)}
                data-cy="geboortedatum_input"
                className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-blue-400"
              />
            </div>
            {errors.geboorteDatum && (
              <p className="text-red-500 text-xs mt-1">
                {errors.geboorteDatum.message}
              </p>
            )}
          </div>

          {/* BESCHRIJVING (alleen voor leiding) */}
          {userType === 'leiding' && (
            <>
              <div className="w-72 md:w-80 mb-4">
                <label className="block mb-1 text-sm font-medium text-blue-700">
                  Leeftijdsgroep
                </label>
                <select
                  {...register('ageGroup', validationRules.ageGroup)}
                  data-cy="agegroup_select"
                  className="w-full bg-blue-100 rounded-2xl px-4 py-3
                             focus:ring-2 focus:ring-blue-400 shadow-sm text-gray-700 outline-none"
                >
                  <option value="">-- Selecteer leeftijdsgroep --</option>
                  <option value="+16">+16</option>
                  <option value="Sjo’ers">Sjo'ers (14-16)</option>
                  <option value="Knimmers">Knimmers (12-14)</option>
                  <option value="Joro’s">Joro's (10-12)</option>
                  <option value="Paggaders">Paggaders (8-10)</option>
                  <option value="Sloebers">Sloebers (6-8)</option>
                </select>
                {errors.ageGroup && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.ageGroup.message}
                  </p>
                )}
              </div>

              <div className="w-72 md:w-80 mb-2">
                <label className="block mb-1 text-sm font-medium text-blue-700">
                  Beschrijving
                </label>
                <div className="flex items-start bg-blue-100 rounded-2xl px-4 py-3
                                focus-within:ring-2 focus-within:ring-blue-400 shadow-sm">
                  <textarea
                    placeholder="Beschrijf jezelf..."
                    {...register('beschrijving', validationRules.beschrijving)}
                    data-cy="beschrijving_input"
                    className="bg-transparent outline-none flex-1 text-gray-700 
                    placeholder:text-blue-400 resize-none min-h-20"
                  />
                </div>
                {errors.beschrijving && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.beschrijving.message}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Divider */}
          <div className="flex items-center my-4 w-72 md:w-80">
            <div className="flex-1 border-b-2 border-blue-400 shadow-sm" />
          </div>

          {/* WACHTWOORD */}
          <div className="w-72 md:w-80 mb-4">
            <label className="block mb-1 text-sm font-medium text-blue-700">
              Wachtwoord
            </label>
            <div className="flex items-center bg-blue-100 rounded-2xl px-4 py-3
                            focus-within:ring-2 focus-within:ring-blue-400 shadow-sm">
              <PiLockLight className="text-blue-400 text-2xl" />
              <div className="h-6 w-px bg-blue-300 mx-3" />
              <input
                type="password"
                placeholder="Wachtwoord"
                {...register('password', validationRules.password)}
                data-cy="wachtwoord_input"
                className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-blue-400"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* BEVESTIG WACHTWOORD */}
          <div className="w-72 md:w-80 mb-4">
            <label className="block mb-1 text-sm font-medium text-blue-700">
              Bevestig wachtwoord
            </label>
            <div className="flex items-center bg-blue-100 rounded-2xl px-4 py-3
                            focus-within:ring-2 focus-within:ring-blue-400 shadow-sm">
              <PiLockLight className="text-blue-400 text-2xl" />
              <div className="h-6 w-px bg-blue-300 mx-3" />
              <input
                type="password"
                placeholder="Bevestig wachtwoord"
                {...register('confirmPassword', validationRules.confirmPassword)}
                data-cy="bevestig_wachtwoord_input"
                className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-blue-400"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* KNOPPEN */}
          <button
            type="submit"
            disabled={loading}
            data-cy="register_btn"
            className="mt-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 cursor-pointer text-white
                       py-3 rounded-2xl transition-all shadow-md w-72 md:w-80"
          >
            Registreren
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="mt-2 bg-gray-200 hover:bg-gray-300 text-blue-700
            py-3 rounded-2xl transition-all shadow-md w-72 md:w-80 hover:cursor-pointer"
          >
            Annuleren
          </button>

          <div className="flex flex-col items-center mt-6 text-sm">
            <p className="text-black">
              Heb je al een account?{' '}
              <Link to="/login" className="font-semibold text-blue-600 underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
