const InschrijvenKnop = ({
  kampId,
  onInschrijven,
  onUitschrijven,
  isBusy,
  isIngeschreven,
}) => {
  const handleClick = () => {
    if (isBusy) return;
    if (isIngeschreven) {
      onUitschrijven?.(kampId);
    } else {
      onInschrijven(kampId);
    }
  };

  const baseClasses = 'py-1 px-3 transition rounded-4xl mt-2 mx-2 text-white';
  const busyClasses = 'bg-gray-400 cursor-not-allowed';
  const inschrijvenClasses = 'bg-green-500 hover:bg-green-600 hover:cursor-pointer';
  const uitschrijvenClasses = 'bg-blue-500 hover:bg-blue-600 hover:cursor-pointer';

  const buttonClasses = `${baseClasses} ${
    isBusy
      ? busyClasses
      : isIngeschreven
        ? uitschrijvenClasses
        : inschrijvenClasses
  }`;

  return (
    <button
      onClick={handleClick}
      disabled={isBusy}
      data-cy={isIngeschreven ? 'uitschrijven-btn' : 'inschrijven-btn'}
      className={buttonClasses}
    >
      {isBusy ? 'Bezig...' : isIngeschreven ? 'Uitschrijven' : 'Inschrijven'}
    </button>
  );
};

export default InschrijvenKnop;