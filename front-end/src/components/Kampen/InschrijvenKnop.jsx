const InschrijvenKnop = ({ kampId, onInschrijven, isBusy }) => {
  const handleClick = () => {
    onInschrijven(kampId);
  };

  return (
    <button 
      onClick={handleClick}
      disabled={isBusy}
      data-cy="inschrijven-btn"
      className={`py-1 px-3 transition rounded-4xl mt-2 mx-2
                        ${isBusy ? 'bg-gray-400 cursor-not-allowed' 
      : 'bg-green-500 hover:bg-green-600 text-white'}`}
    >
      {isBusy ? 'Bezig...' : 'Inschrijven'}
    </button>
  );
};

export default InschrijvenKnop;