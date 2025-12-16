import { useParams, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import Error from '../../components/Error';

const getToken = () => localStorage.getItem('jwtToken'); // Gebruik JWT_TOKEN_KEY string

// De fetcher past nu de Authorization header toe
const fetcher = (url) => {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }), 
  };
  
  return fetch(`http://localhost:3000${url}`, { headers })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    });
};

function KampDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: kamp, isLoading: kampLoading, error: kampError } = useSWR(
    `/api/kampen/${id}`,
    fetcher,
  );

  if (kampLoading) return <div className="text-gray-800 dark:text-gray-100">Laden...</div>;
  if (kampError) return <Error error={kampError} />;

  const { naam, stad, startDatum, eindDatum, beschrijving, leden, leiding } = kamp;

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-gray-900 
    rounded-xl shadow-xl p-6 transition-colors text-gray-800 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-300">
        Details van {naam} ({stad})
      </h2>
      
      <p className="mb-4 text-gray-700 dark:text-gray-200 whitespace-pre-wrap">{beschrijving}</p>

      <div className="space-y-3 border-t pt-4">
        <p>
          <span className="font-bold text-gray-600 dark:text-gray-300">Periode:</span>{' '}
          {new Date(startDatum).toLocaleDateString()} <span className="font-bold">t/m</span>{' '}
          {new Date(eindDatum).toLocaleDateString()}
        </p>

        {/* Leden Lijst */}
        {leden && leden.length > 0 && (
          <div className="border border-gray-200 dark:border-gray-700 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span className="font-bold text-lg text-red-600 dark:text-red-300">Leden ({leden.length}):</span>
            <ul className="list-disc list-inside mt-1 ml-4 space-y-1 text-gray-800 dark:text-gray-100">
              {leden.map((lid) => (
                // Zorg ervoor dat de lid structuur overeenkomt met de DTO
                <li key={lid.id}>
                  {lid.voornaam} {lid.achternaam}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Leiding Lijst */}
        {leiding && leiding.length > 0 && (
          <div className="border border-gray-200 dark:border-gray-700 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span className="font-bold text-lg text-green-600 dark:text-green-300">Leiding ({leiding.length}):</span>
            <ul className="list-disc list-inside mt-1 ml-4 space-y-1 text-gray-800 dark:text-gray-100">
              {leiding.map((leider) => (
                // Zorg ervoor dat de leider structuur overeenkomt met de DTO
                <li key={leider.id}>
                  {leider.voornaam} {leider.achternaam}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm 
        dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-50 transition-colors"
      >
        Terug naar overzicht
      </button>
    </div>
  );
}

export default KampDetail;
