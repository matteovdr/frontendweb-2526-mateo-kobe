import { deleteById } from '../../api';
import { mutate } from 'swr';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import InschrijvenKnop from './InschrijvenKnop';

function Kamp({ id, naam, stad, startDatum, eindDatum, alGedaan, onInschrijven, isBusy }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Check if user is hoofdleiding
  const isHoofleiding = user && Array.isArray(user.roles) && user.roles.includes('hoofdleiding');

  let activeButtons = 0;
  // Inschrijfknop OF de statische knop is altijd aanwezig
  activeButtons += 1; 
  // Details knop is altijd aanwezig
  activeButtons += 1; 
  // Verwijder knop is optioneel
  if (isHoofleiding) {
    activeButtons += 1;
  }
  const isLid = user && Array.isArray(user.roles) && user.roles.includes('lid');
  const kanInschrijven = !alGedaan && user && isLid; // 🛑 Kan inschrijven is alleen voor Leden en Toekomstige kampen

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

  return (
    <div className="flex flex-1 flex-col place-content-center 
        border border-blue-300 rounded-2xl p-5 bg-gray-100 shadow-xl">

      <h3 className="text-center font-semibold text-xl text-blue-600">
        {naam}
      </h3>

      {/* DATA */}
      <div>
        <div className="grid grid-cols-2 border-t">
          <label className="font-bold self-center">Stad</label>
          <p className="text-right self-center">{stad}</p>
        </div>

        <div className="grid grid-cols-2">
          <label className="font-bold self-center">Start datum</label>
          <p className="text-right self-center">
            {new Date(startDatum).toDateString()}
          </p>
        </div>

        <div className="grid grid-cols-2 border-b">
          <label className="font-bold self-center">Eind datum</label>
          <p className="text-right self-center">
            {new Date(eindDatum).toDateString()}
          </p>
        </div>
      </div>

      {/* BUTTONS */}
      <div className={`grid grid-cols-${activeButtons} gap-2 mt-2`}>
        {kanInschrijven && (
          <InschrijvenKnop
            kampId={id}
            onInschrijven={onInschrijven}
            isBusy={isBusy}
          />
        )}

        {!kanInschrijven && (
          <button
            className={`text-white rounded-4xl mt-2 mx-2 py-1 px-3 text-sm
                      ${alGedaan ? 'bg-gray-400 cursor-default' : 'bg-blue-500 cursor-default'}`}
            disabled={true}
          >
            {alGedaan ? 'Afgewerkt' : 'Inschrijven'}
          </button>
        )}

        <button
          onClick={handleDetails}
          className="bg-yellow-500 text-white rounded-4xl mt-2 mx-2 py-1 px-3 text-sm
            hover:bg-yellow-600 cursor-pointer"
        >
          Details
        </button>

        {isHoofleiding && (
          <button
            data-cy={'delete'}
            onClick={handleDelete}
            className="bg-red-500 text-white rounded-4xl mt-2 mx-2 py-1 px-3 text-sm
              justify-self-center hover:bg-red-600 cursor-pointer"
          >
            Verwijder
          </button>
        )}
      </div>
    </div>
     
  );
}

export default Kamp;
