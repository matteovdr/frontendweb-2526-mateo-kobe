function Kamp() {
  return (
    <div className="grid grid-cols-2 grid-rows-4 place-content-center 
    border-2 border-blue-400 rounded-2xl p-5">
      <h3 className="col-span-2 text-center font-semibold text-2xl text-orange-500
      border-b-1 border-black">hier komt de naam</h3>

      <label className="font-bold self-end">Locatie</label>
      <p className="text-right self-end"> Hier komt de locatie</p>

      <label className="font-bold self-center">Start datum</label>
      <p className="text-right self-center">datum hier</p>

      <label className="font-bold self-center border-b-1 pb-2">Eind datum</label>
      <p className="text-right self-center border-b-1 pb-2">datum hier</p>

      {/*TODO als de gebruiker niet de rechten heeft voor te 
      deleten dan moet delete weg en inschrijven een colspan van 2 krijgen*/}
      <button className="bg-blue-500 text-white rounded-4xl mt-2 py-1.5
      justify-self-center px-4 min-w-1/2">Inschrijven</button>

      <button className="bg-red-500 text-white rounded-4xl mt-2 py-1.5
      justify-self-center px-4 min-w-1/2">Verwijder</button>
    </div>
  );
}

export default Kamp;