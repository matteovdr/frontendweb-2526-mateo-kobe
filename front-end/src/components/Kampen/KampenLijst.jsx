import Kamp from './Kamp';

function KampenLijst( alGedaan ) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 2xl:px-60">
        
        <Kamp />
        <Kamp />
        <Kamp />
        <Kamp />
        <Kamp />
      </div>
    </>
  );
} 
export default KampenLijst;