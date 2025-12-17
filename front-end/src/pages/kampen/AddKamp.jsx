import { Navigate } from 'react-router-dom';
import KampForm from '../../components/Kampen/KampForm';
import { useAuth } from '../../contexts/auth';

function AddKamp() {
  const { user, ready } = useAuth();
  const isHoofdleiding = user && Array.isArray(user.roles) && user.roles.includes('hoofdleiding');

  if (!ready) return null;
  if (!isHoofdleiding) return <Navigate to="/kampen" replace />;

  return (
    <div className="p-6 flex flex-1 flex-col h-full
    min-w-full min-h-full bg-[url(/images/achtergrondImageKampMaken.webp)] bg-cover bg-center">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Voeg een nieuw kamp toe
      </h1>
      <KampForm />
    </div>
  );
}

export default AddKamp;
