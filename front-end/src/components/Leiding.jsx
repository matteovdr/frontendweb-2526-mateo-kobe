import { useMemo } from 'react';
import useSWR from 'swr';
import { getAll } from '../api/';

export default function Leiding() {

  const {
    data: leiding = [],
    isLoading,
    error,
  } = useSWR('leiding', getAll );
  console.log('leiding:', leiding);

  const groepen = useMemo(() => {
    return leiding.reduce((acc, lid) => {
      if (!acc[lid.ageGroup]) acc[lid.ageGroup] = [];
      acc[lid.ageGroup].push(lid);
      return acc;
    }, {});
  }, [leiding]);

  if (isLoading) {
    return <p className="text-center mt-8">Gegevens worden geladen...</p>;
  }
  if (error) {
    return (
      <p className="text-center mt-8 text-red-500">
        Fout bij het ophalen van leiding: {error.message}
      </p>
    );
  }

  return (
    <div className="p-8 text-center max-w-full mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-[#004C97]">
        Onze leidingsploeg
      </h2>
      <img
        src="/images/leiding.jpg"
        className="w-full h-96 object-cover mb-8 max-w-4xl justify-self-center"
        alt="Leiding"
      />

      <p className="text-lg text-gray-700 leading-relaxed mb-12 max-w-4xl justify-self-center">
        Onze leidingsploeg bestaat uit enthousiaste vrijwilligers die elke week opnieuw het beste van
        zichzelf geven om onze leden een geweldige tijd te bezorgen. Hieronder stellen we graag onze
        leidingsploeg voor, verdeeld per leeftijdsgroep.
      </p>

      {Object.entries(groepen).map(([groepNaam, leiding]) => (
        <div key={groepNaam} className="mb-16">
          <h3 className="text-2xl font-semibold text-[#004C97] mb-6">
            {groepNaam}
          </h3>

          <div className="flex flex-wrap justify-center gap-8">
            {leiding.map((leiding) => (
              <div
                key={leiding.id}
                className="bg-white rounded-2xl shadow-md p-6 max-w-xs text-center
                 hover:shadow-lg transition-shadow duration-200"
              >
                <img
                  src={leiding.imageUrl}
                  alt={leiding.name}
                  className="w-40 h-40 mx-auto rounded-full object-cover mb-4"
                />
                <h4 className="text-xl font-semibold text-[#004C97]">
                  {leiding.name}
                </h4>
                {leiding.description && (
                  <p className="text-gray-700 text-sm mt-2">{leiding.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  
}
