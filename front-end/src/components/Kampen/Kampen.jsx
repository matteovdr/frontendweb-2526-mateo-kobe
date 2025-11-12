import KampenLijst from './KampenLijst';

function Kampen() {
  return (
    <div className="p-3 border-2 border-green-700">
      <h1 className="text-4xl lg:text-6xl font-semibold mb-4 text-[#004C97]">Kampen</h1>
      <p>Dit zijn onze kampen die we gedaan hebben en die ingepland zijn.
        Deze kampen zijn voor de leden voor eens veel plezier te hebben! <br />
        Er moet wel altijd inschijvingsgeld betaald worden.
        In geval van ziekte worden de ouders gebeld en moet het kind worden opgehaald.</p>
      <h2 className='text-3xl mb-4 text-orange-500 text-center'>Dit zijn de kampen die we gedaan hebben.</h2>
      <KampenLijst alGedaan={true}/>
      <div className="border-b-1 border-orange-400 my-6"></div>
      <h2 className='text-3xl mb-4 text-orange-500 text-center'>Dit zijn de kampen die we nog gaan doen!</h2>
      {/*TODO h2 classname */}
      <KampenLijst alGedaan={false}/>
    </div>
    
  );
} 
export default Kampen;