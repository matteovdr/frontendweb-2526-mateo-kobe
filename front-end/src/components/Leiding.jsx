import { useEffect, useState } from 'react';
import * as leidingApi from '../api/leiding';

export default function Leiding() {
  const [leiding, setLeiding] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeiding = async () => {
      try {
        const data = await leidingApi.getAll();
        setLeiding(data);
      } catch (error) {
        console.error('Fout bij het ophalen van leiding:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeiding();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Gegevens worden geladen...</p>;
  }

  const groepen = leiding.reduce((acc, lid) => {
    if (!acc[lid.groep]) acc[lid.groep] = [];
    acc[lid.groep].push(lid);
    return acc;
  }, {});

  return (
    <div className="p-8 text-center max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-[#004C97]">
        Onze leidingsploeg
      </h2>
      <img
        src="/images/leiding.jpg"
        className="w-full h-96 object-cover mb-8"
        alt="Leiding"
      />

      <p className="text-lg text-gray-700 leading-relaxed mb-12">
        Onze leidingsploeg bestaat uit enthousiaste vrijwilligers die elke week opnieuw het beste van
        zichzelf geven om onze leden een geweldige tijd te bezorgen. Hieronder stellen we graag onze
        leidingsploeg voor, verdeeld per leeftijdsgroep.
      </p>

      {Object.entries(groepen).map(([groepNaam, leiding]) => (
        <div key={groepNaam} className="mb-16">
          <h3 className="text-2xl font-semibold text-[#004C97] mb-6">
            {groepNaam}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
            {leiding.map((leiding) => (
              <div
                key={leiding.id}
                className="bg-white rounded-2xl shadow-md p-6 max-w-xs text-center
                 hover:shadow-lg transition-shadow duration-200"
              >
                <img
                  src={leiding.foto}
                  alt={leiding.naam}
                  className="w-40 h-40 mx-auto rounded-full object-cover mb-4"
                />
                <h4 className="text-xl font-semibold text-[#004C97]">
                  {leiding.naam}
                </h4>
                {leiding.omschrijving && (
                  <p className="text-gray-700 text-sm mt-2">
                    {leiding.omschrijving}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

