import { useMemo, useCallback } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import KampenLijst from '../../components/Kampen/KampenLijst';
import { getAll, post } from '../../api';
import { Link } from 'react-router-dom';
import AsyncData from '../../components/AsyncData';
import { useAuth } from '../../contexts/auth';

function Kampen() {
  const {
    data: kampen = [],
    isLoading,
    error,
  } = useSWR('kampen', getAll);

  const verledenKampen = useMemo(
    () => kampen.filter((k) => new Date(k.startDatum) <= new Date()),
    [kampen],
  );

  const toekomstigeKampen = useMemo(
    () => kampen.filter((k) => new Date(k.startDatum) > new Date()),
    [kampen],
  );

  const { user, token } = useAuth();

  const { trigger: inschrijvenTrigger, isMutating: isBusy } = useSWRMutation(
    'kampen/inschrijven',
    (url, { arg: kampId }) =>
      post(`kampen/${kampId}/inschrijven`, { arg: null }),
  );

  const handleInschrijven = useCallback(async (kampId) => {
    if (!user || !token) return alert('U moet ingelogd zijn om in te schrijven.');

    try {
      console.log(kampId);
      await inschrijvenTrigger(kampId);

      alert('🥳 Inschrijving is gelukt!');
    } catch (e) {
      console.error('Inschrijffout:', e);
      const errorMessage = e.message || e.toString();
            
      if (errorMessage.includes('409') || errorMessage.includes('Conflict')) {
        alert('⚠️ U bent al ingeschreven voor dit kamp.');
      } else {
        alert('Fout tijdens inschrijving. Controleer uw verbinding.');
      }
    }
  }, [user, token, inschrijvenTrigger]);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-[#004C97] to-blue-600 
      dark:from-blue-900 dark:to-blue-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            🏕️ Onze Kampen
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-blue-50">
            Dit zijn onze kampen die we gedaan hebben en die ingepland zijn. 
            Deze kampen zijn voor eens veel plezier te hebben! 
            Er moet wel altijd inschrijvingsgeld betaald worden.
            In geval van ziekte worden de ouders gebeld en moet het kind worden opgehaald.
          </p>
        </div>
      </div>

      <div className="max-w-9xl mx-auto px-4 py-12">
        {/* Controleer of de gebruiker bestaat (is ingelogd) en of de rollen de vereiste rol bevatten */}
        {user && user.roles.includes('hoofdleiding') && (
          <div className='flex justify-center mb-12'>
            <Link
              to="add"
              className='inline-flex items-center gap-2 py-4 px-8 bg-linear-to-r from-blue-500 to-blue-600 
              hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg 
              hover:shadow-xl transform hover:scale-105 transition duration-300'
            >
              <span className="text-2xl">+</span>
              Voeg een kamp toe
            </Link>
          </div>
        )}

        <AsyncData loading={isLoading} error={error}>
          {/* Verleden Kampen Sectie */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                📚 Kampen die we gedaan hebben
              </h2>
              <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
            <KampenLijst kampen={verledenKampen} alGedaan={true} />
          </div>

          {/* Toekomstige Kampen Sectie */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                🎉 Kampen die we nog gaan doen!
              </h2>
              <div className="w-24 h-1 bg-linear-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
            </div>
            <KampenLijst 
              kampen={toekomstigeKampen} 
              alGedaan={false} 
              user={user}
              onInschrijven={handleInschrijven} 
              isBusy={isBusy}
            />
          </div>
        </AsyncData>
      </div>
    </div>
  );
}

export default Kampen;
