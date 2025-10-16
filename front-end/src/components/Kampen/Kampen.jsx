import KampenLijst from './KampenLijst';

function Kampen() {
  return (
    <div className="p-3">
      <h2 className="text-4xl lg:text-6xl font-semibold mb-4 text-[#004C97]">Kampen</h2>
      <KampenLijst />
    </div>
    
  );
} 
export default Kampen;