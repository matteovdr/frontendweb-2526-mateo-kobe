import { useMemo } from 'react';
import useSWR from 'swr';
import { getAll } from '../api/';
import AsyncData from '../components/AsyncData';
import { CiImageOff } from 'react-icons/ci';

export default function Leiding() {
  const {
    data: leiding = [],
    isLoading,
    error,
  } = useSWR('leiding', getAll);

  const groepen = useMemo(() => {
    return leiding.reduce((acc, lid) => {
      if (!acc[lid.ageGroup]) acc[lid.ageGroup] = [];
      acc[lid.ageGroup].push(lid);
      return acc;
    }, {});
  }, [leiding]);

  return (
    <AsyncData loading={isLoading} error={error}>
      <div className="p-8 text-center max-w-full mx-auto text-gray-800 dark:text-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-[#004C97] dark:text-blue-200">
          Onze leidingsploeg
        </h2>
        <img
          src="/src/images/leiding.jpg"
          className="w-full h-96 object-cover mb-8 max-w-4xl justify-self-center rounded-2xl"
          alt="Leiding"
        />

        <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-12 max-w-4xl justify-self-center">
          Onze leidingsploeg bestaat uit enthousiaste vrijwilligers die elke week opnieuw het beste van
          zichzelf geven om onze leden een geweldige tijd te bezorgen. Hieronder stellen we graag onze
          leidingsploeg voor, verdeeld per leeftijdsgroep.
        </p>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-[#004C97] dark:text-blue-200 mb-6">
            Hoofdleiding
          </h3>

          <div className="flex flex-wrap justify-center gap-8">
            {leiding
              .filter((Hoofdleiding) => Hoofdleiding.isHoofdleiding === true)
              .map((Hoofdleiding) => (
                <div
                  key={Hoofdleiding.id}
                  className="bg-white dark:bg-gray-800 border border-blue-300 
                  dark:border-gray-700 rounded-2xl shadow-md p-6 max-w-xs text-center
                  hover:shadow-lg transition-shadow duration-200"
                >
                  {Hoofdleiding.imageUrl ? (
                    <img
                      src={Hoofdleiding.imageUrl}
                      alt={Hoofdleiding.name}
                      className="w-40 h-40 mx-auto rounded-full object-cover mb-4"
                    />
                  ) : (
                    <div className="w-40 h-40 mx-auto rounded-full bg-gray-200 
                    dark:bg-gray-700 flex items-center justify-center mb-4">
                      <CiImageOff className="text-4xl text-gray-400 dark:text-gray-500" />
                    </div>
                  )}
                  <h4 className="text-xl font-semibold text-[#004C97] dark:text-blue-300">
                    {Hoofdleiding.name}
                  </h4>
                  {Hoofdleiding.description && (
                    <p className="text-gray-700 dark:text-gray-200 text-sm mt-2">
                      {Hoofdleiding.description}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>

        {Object.entries(groepen).map(([groepNaam, groepLeiding]) => (
          <div key={groepNaam} className="mb-16">
            <h3 className="text-2xl font-semibold text-[#004C97] dark:text-blue-200 mb-6">
              {groepNaam}
            </h3>

            <div className="flex flex-wrap justify-center gap-8">
              {groepLeiding.map((leiding) => (
                <div
                  key={leiding.id}
                  className="bg-white dark:bg-gray-800 border border-blue-300 
                  dark:border-gray-700 rounded-2xl shadow-md p-6 max-w-xs text-center
                  hover:shadow-lg transition-shadow duration-200"  
                >
                  {leiding.imageUrl ? (
                    <img
                      src={leiding.imageUrl}
                      alt={leiding.voornaam}
                      className="w-40 h-40 mx-auto rounded-full object-cover mb-4"
                    />
                  ) : (
                    <div className="w-40 h-40 mx-auto rounded-full bg-gray-200 
                    dark:bg-gray-700 flex items-center justify-center mb-4">
                      <CiImageOff className="text-4xl text-gray-400 dark:text-gray-500" />
                    </div>
                  )}
                  <h4 className="text-xl font-semibold text-[#004C97] dark:text-blue-300">
                    {leiding.voornaam}
                  </h4>
                  {leiding.description && (
                    <p className="text-gray-700 dark:text-gray-200 text-sm mt-2">{leiding.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AsyncData>
  );
}
