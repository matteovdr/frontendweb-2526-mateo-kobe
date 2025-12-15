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
    <div className="p-3 text-gray-800 dark:text-gray-100">
      <h1 className="text-6xl font-semibold mb-4 text-[#004C97] dark:text-blue-200 text-center">Kampen</h1>
      <p className="text-center py-4 text-gray-700 dark:text-gray-200">
        Dit zijn onze kampen die we gedaan hebben en die ingepland zijn. <br />
        Deze kampen zijn voor eens veel plezier te hebben! <br />
        Er moet wel altijd inschrijvingsgeld betaald worden.
        In geval van ziekte worden de ouders gebeld en moet het kind worden opgehaald.
      </p>

      {/* Controleer of de gebruiker bestaat (is ingelogd) en of de rollen de vereiste rol bevatten */}
      {user && user.roles.includes('hoofdleiding') ? (
        <div className='flex justify-center border-y my-6 2xl:mx-60'>
          <Link
            to="add"
            className='my-6 py-4 px-16 border border-blue-300 rounded-2xl
          text-blue-500 dark:text-blue-200 cursor-pointer hover:bg-blue-500 hover:text-white
          dark:border-blue-500 dark:hover:bg-blue-600 transition duration-300'
          >
            Voeg een kamp toe
          </Link>
        </div>
      ) : (
      // Laat hier niets zien als de gebruiker de rol niet heeft
        '' 
      )}

      <AsyncData loading={isLoading} error={error}>
        <h2 className="text-4xl mb-4 text-blue-500 dark:text-blue-200 text-center">
          Dit zijn de kampen die we gedaan hebben
        </h2>
        <KampenLijst kampen={verledenKampen} alGedaan={true} />

        <h2 className="text-4xl mb-4 text-blue-500 dark:text-blue-200 text-center mt-14">
          Dit zijn de kampen die we nog gaan doen!
        </h2>
        <KampenLijst 
          kampen={toekomstigeKampen} 
          alGedaan={false} 
          user={user}
          onInschrijven={handleInschrijven} 
          isBusy={isBusy}
        />
      </AsyncData>
    </div>
  );
}

export default Kampen;
