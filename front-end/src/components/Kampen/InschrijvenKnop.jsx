const InschrijvenKnop = ({ kampId, onInschrijven, isBusy }) => {
  const handleClick = () => {
    onInschrijven(kampId);
  };

  return (
    <button 
      onClick={handleClick}
      disabled={isBusy}
      className={`px-4 py-2 rounded transition 
                        ${isBusy ? 'bg-gray-400 cursor-not-allowed' 
      : 'bg-green-500 hover:bg-green-600 text-white'}`}
    >
      {isBusy ? 'Bezig...' : 'Inschrijven'}
    </button>
  );
};

export default InschrijvenKnop;