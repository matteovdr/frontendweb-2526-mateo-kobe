function Kamp({key, naam, locatie, startDatum, eindDatum, alGedaan}) {
  return (
    <div className="flex flex-1 flex-col place-content-center
    border border-blue-300 rounded-2xl p-5 bg-gray-100 shadow-xl">
      {/* NAAM */}
      <h3 className="text-center font-semibold text-xl
      text-blue-600 border-black">{naam}</h3>

      {/* LOCATIE */}
      <div>
        <div className="grid grid-cols-2 border-t">
          <label className="font-bold self-center">Locatie</label>
          <p className="text-right self-center">{locatie}</p>
        </div>

        {/* START DATUM */}
        <div className="grid grid-cols-2">
          <label className="font-bold self-center">Start datum</label>
          <p className="text-right self-center">{new Date(startDatum).toDateString()}</p>
        </div>

        {/* EIND DATUM */}
        <div className="grid grid-cols-2 border-b">
          <label className="font-bold self-center">Eind datum</label>
          <p className="text-right self-center">{new Date(eindDatum).toDateString()}</p>
        </div>
      </div>

      {/*TODO als de gebruiker niet de rechten heeft voor te 
      deleten dan moet delete weg en grid-cols op 1 staan*/}
      <div className="grid grid-cols-2">
        {/* BUTTON INSCHRIJVEN */}
        <button className={`text-white rounded-4xl mt-2 py-1.5 justify-self-center px-4 min-w-1/2
        ${alGedaan ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'}`}>Inschrijven</button>

        {/* bUTTON VERWIJDER */}
        <button className="bg-red-500 text-white rounded-4xl mt-2 py-1.5
        justify-self-center px-4 min-w-1/2 hover:bg-red-600 cursor-pointer">Verwijder</button>
      </div>
    </div>
  );
}

export default Kamp;