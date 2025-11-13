function Kamp() {
  return (
    <div className="grid grid-cols-2 grid-rows-4 place-content-center 
    border-3 border-blue-300 rounded-2xl p-5 bg-white shadow-xl">
      <h3 className="col-span-2 text-center font-semibold text-2xl 
      text-blue-600 border-black">hier komt de naam</h3>

      <div className="grid grid-cols-2 col-span-2 border-t">
        <label className="font-bold self-center">Locatie</label>
        <p className="text-right self-center"> Hier komt de locatie</p>
      </div>

      <label className="font-bold self-center">Start datum</label>
      <p className="text-right self-center">datum hier</p>

      <div className="grid grid-cols-2 col-span-2 border-b">
        <label className="font-bold self-center">Eind datum</label>
        <p className="text-right self-center">datum hier</p>
      </div>

      {/*TODO als de gebruiker niet de rechten heeft voor te 
      deleten dan moet delete weg en inschrijven een colspan van 2 krijgen*/}
      <button className="bg-blue-500 text-white rounded-4xl mt-2 py-1.5
      justify-self-center px-4 min-w-1/2 hover:bg-blue-600 cursor-pointer">Inschrijven</button>

      <button className="bg-red-500 text-white rounded-4xl mt-2 py-1.5
      justify-self-center px-4 min-w-1/2 hover:bg-red-600 cursor-pointer">Verwijder</button>
    </div>
  );
}

export default Kamp;