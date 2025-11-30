import { useParams, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import Error from '../../components/Error';

const fetcher = (url) =>
  fetch(`http://localhost:3000${url}`).then((res) => res.json());

function KampDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: kamp, isLoading: kampLoading, error: kampError } = useSWR(
    `/api/kampen/${id}`,
    fetcher,
  );

  const { data: leden, isLoading: ledenLoading, error: ledenError } = useSWR(
    `/api/kampen/${id}/leden`,
    fetcher,
  );
  const { data: leiding, isLoading: leidingLoading, error: leidingError } = useSWR(
    `/api/kampen/${id}/leiding`,
    fetcher,
  );

  if (kampLoading) return <div>Laden...</div>;
  if (kampError) return <Error error={kampError} />;

  const { naam, stad, startDatum, eindDatum } = kamp;

  return (
    
    <div className="max-w-xl mx-auto mt-8 bg-white rounded-xl shadow-xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">
        Details van {naam}
      </h2>

      <div className="space-y-2">
        <p><span className="font-bold">Stad:</span> {stad}</p>
        <p>
          <span className="font-bold">Start datum:</span>{' '}
          {new Date(startDatum).toDateString()}
        </p>
        <p>
          <span className="font-bold">Eind datum:</span>{' '}
          {new Date(eindDatum).toDateString()}
        </p>

        <p>
          <span className="font-bold">Leden:</span>{' '}
          {ledenLoading && 'Laden...'}
          <Error error={ledenError} />
          {leden && leden.length === 0 && 'Geen leden gevonden'}
        </p>
        {leden && leden.length > 0 && (
          <ul className="list-disc list-inside">
            {leden.map((lid) => (
              <li key={lid.id}>
                {lid.voornaam} {lid.achternaam} ({lid.ageGroup})
              </li>
            ))}
          </ul>
        )}

        <p>
          <span className="font-bold">Leiding:</span>{' '}
          {leidingLoading && 'Laden...'}
          <Error error={leidingError} />
          {leiding && leiding.length === 0 && 'Geen leiding gevonden'}
        </p>
        {leiding && leiding.length > 0 && (
          <ul>
            {leiding.map((leider) => (
              <li key={leider.id}>
                {leider.voornaam} {leider.achternaam}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
      >
        Terug
      </button>
    </div>
  );
}

export default KampDetail;
