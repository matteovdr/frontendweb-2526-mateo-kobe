import { useMemo } from 'react';
import useSWR from 'swr';
import KampenLijst from '../../components/Kampen/KampenLijst';
import { getAll } from '../../api';
import { Link } from 'react-router-dom';
import AsyncData from '../../components/AsyncData';

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

  return (
    <div className="p-3">
      <h1 className="text-6xl font-semibold mb-4 text-[#004C97] text-center">Kampen</h1>
      <p className="text-center py-4">
        Dit zijn onze kampen die we gedaan hebben en die ingepland zijn. <br />
        Deze kampen zijn voor eens veel plezier te hebben! <br />
        Er moet wel altijd inschrijvingsgeld betaald worden.
        In geval van ziekte worden de ouders gebeld en moet het kind worden opgehaald.
      </p>

      <div className='flex justify-center border-y my-6 2xl:mx-60'>
        <Link
          to="add"
          className='my-6 py-4 px-16 border border-blue-300 rounded-2xl
          text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white
          transition duration-300'
        >
          Voeg een kamp toe
        </Link>
      </div>

      <AsyncData loading={isLoading} error={error}>
        <h2 className="text-4xl mb-4 text-blue-500 text-center">
          Dit zijn de kampen die we gedaan hebben
        </h2>
        <KampenLijst kampen={verledenKampen} alGedaan={true} />

        <h2 className="text-4xl mb-4 text-blue-500 text-center mt-14">
          Dit zijn de kampen die we nog gaan doen!
        </h2>
        <KampenLijst kampen={toekomstigeKampen} alGedaan={false} />
      </AsyncData>
    </div>
  );
}

export default Kampen;
