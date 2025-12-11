import { useAuth } from '../contexts/auth';

function Home() {
  const { user} = useAuth();

  return (
    <div className="p-8 text-center">
      <h2 className="text-3xl font-semibold mb-4 text-[#004C97]">
        {user ? `Welkom, ${user.voornaam}!` : 'Welkom!'}
      </h2>
    </div>
  );
}

export default Home;
