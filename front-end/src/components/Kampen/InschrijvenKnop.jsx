const BASE_CLASSES = 'py-1 px-3 transition rounded-4xl mt-2 mx-2 text-white';
const BUSY_CLASSES = 'bg-gray-400 cursor-not-allowed';
const INSCHRIJVEN_CLASSES = 'bg-green-500 hover:bg-green-600 hover:cursor-pointer';
const UITSCHRIJVEN_CLASSES = 'bg-blue-500 hover:bg-blue-600 hover:cursor-pointer';

const getButtonClasses = (isBusy, isIngeschreven) => `${BASE_CLASSES} ${
  isBusy ? BUSY_CLASSES : isIngeschreven ? UITSCHRIJVEN_CLASSES : INSCHRIJVEN_CLASSES
}`;

const BUTTON_LABELS = {
  busy: 'Bezig...',
  uitschrijven: 'Uitschrijven',
  inschrijven: 'Inschrijven',
};

const getButtonLabel = (isBusy, isIngeschreven) =>
  isBusy
    ? BUTTON_LABELS.busy
    : isIngeschreven
      ? BUTTON_LABELS.uitschrijven
      : BUTTON_LABELS.inschrijven;

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

  return (
    <button
      onClick={handleClick}
      disabled={isBusy}
      data-cy={isIngeschreven ? 'uitschrijven-btn' : 'inschrijven-btn'}
      className={getButtonClasses(isBusy, isIngeschreven)}
    >
      {getButtonLabel(isBusy, isIngeschreven)}
    </button>
  );
};

export default InschrijvenKnop;