import KampForm from '../../components/Kampen/KampForm';

function AddKamp() {
  return (
    <div className="p-6 flex flex-1 flex-col min-w-full min-h-full
    min-w-full min-h-full bg-[url(/src/images/achtergrondImageKampMaken.webp)] bg-cover bg-center">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Voeg een nieuw kamp toe
      </h1>
      <KampForm />
    </div>
  );
}

export default AddKamp;
