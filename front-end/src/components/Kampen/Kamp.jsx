import { deleteById } from '../../api';
import { mutate } from 'swr';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import InschrijvenKnop from './InschrijvenKnop';

function Kamp({ id, naam, stad, startDatum, eindDatum, alGedaan, onInschrijven, isBusy }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const isHoofleiding = user && Array.isArray(user.roles) && user.roles.includes('hoofdleiding');
  const isLeidingOrHoofdleiding = user && Array.isArray(user.roles) && 
  (user.roles.includes('leiding') || user.roles.includes('hoofdleiding'));
  const isLid = user && Array.isArray(user.roles) && user.roles.includes('lid');

  const kanInschrijven = !alGedaan && user && (isLid || isLeidingOrHoofdleiding);

  // Tel enkel knoppen die effectief gerenderd worden
  const activeButtons = (
    (kanInschrijven ? 1 : 0) + // inschrijfknop enkel als mogelijk
    1 +                          // details knop altijd
    (isHoofleiding ? 1 : 0)     // verwijderknop voor hoofdleiding
  );

  const handleDelete = async () => {
    if (!confirm(`Weet je zeker dat je ${naam} wil verwijderen?`)) return;

    try {
      await deleteById(`kampen/${id}`);
      mutate('kampen');
    } catch (err) {
      console.error(err);
      alert('Verwijderen mislukt');
    }
  };
  const handleDetails = () => {
    navigate(`/kampen/${id}`);
  };

  const colsClass = activeButtons === 1 ? 'grid-cols-1' : activeButtons === 2 ? 'grid-cols-2' : 'grid-cols-3';
  const badgeText = alGedaan ? 'Afgelopen' : 'Komend';
  const badgeClass = alGedaan
    ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
    : 'bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-200';

  return (
    <div className="flex flex-1 flex-col place-content-center 
        border border-blue-300 dark:border-gray-700 rounded-2xl p-5
        bg-gray-100 dark:bg-gray-800 shadow-xl transition-colors">

      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-xl text-blue-600 dark:text-blue-300">
          {naam}
        </h3>
        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${badgeClass}`}>
          {badgeText}
        </span>
      </div>

      {/* DATA */}
      <div>
        <div className="grid grid-cols-2 border-t border-gray-200 dark:border-gray-700">
          <label className="font-bold self-center text-gray-700 dark:text-gray-200">Stad</label>
          <p className="text-right self-center text-gray-800 dark:text-gray-100">{stad}</p>
        </div>

        <div className="grid grid-cols-2">
          <label className="font-bold self-center text-gray-700 dark:text-gray-200">Start datum</label>
          <p className="text-right self-center text-gray-800 dark:text-gray-100">
            {new Date(startDatum).toDateString()}
          </p>
        </div>

        <div className="grid grid-cols-2 border-b border-gray-200 dark:border-gray-700">
          <label className="font-bold self-center text-gray-700 dark:text-gray-200">Eind datum</label>
          <p className="text-right self-center text-gray-800 dark:text-gray-100">
            {new Date(eindDatum).toDateString()}
          </p>
        </div>
      </div>

      {/* BUTTONS */}
      <div className={`grid ${colsClass} gap-2 mt-2`}>
        {kanInschrijven && (
          <InschrijvenKnop
            kampId={id}
            onInschrijven={onInschrijven}
            isBusy={isBusy}
          />
        )}

        <button
          onClick={handleDetails}
          className="bg-yellow-500 text-white rounded-4xl mt-2 mx-2 py-1 px-3 text-sm
            hover:bg-yellow-600 cursor-pointer dark:bg-yellow-600 dark:hover:bg-yellow-500"
        >
          Details
        </button>

        {isHoofleiding && (
          <button
            data-cy={'delete'}
            onClick={handleDelete}
            className="bg-red-500 text-white rounded-4xl mt-2 mx-2 py-1 px-3 text-sm hover:bg-red-600 cursor-pointer 
            dark:bg-red-600 dark:hover:bg-red-500"
          >
            Verwijder
          </button>
        )}
      </div>
    </div>
     
  );
}

export default Kamp;
