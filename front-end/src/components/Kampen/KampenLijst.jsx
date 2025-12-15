import Kamp from './Kamp';

function KampenLijst({ kampen, alGedaan, user, onInschrijven, isBusy }) { 
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 2xl:px-60">
        {kampen.map((kamp) => (
          <Kamp 
            key={kamp.id} 
            id={kamp.id} 
            naam={kamp.naam} 
            stad={kamp.stad} 
            startDatum={kamp.startDatum}
            eindDatum={kamp.eindDatum} 
            alGedaan={alGedaan}
            user={user}
            onInschrijven={onInschrijven}
            isBusy={isBusy}
          />
        ))}
      </div>
    </>
  );
} 
export default KampenLijst;