import { useAuth } from '../contexts/auth';
import { Link } from 'react-router-dom';

function Home() {
  const { user } = useAuth();

  return (
    <div className="text-gray-800 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative w-full h-screen bg-linear-to-r from-blue-600 
      to-blue-800 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/src/images/ksa.webp"
            alt="KSA Banner"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center px-6 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Welkom bij KSA
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Katholicke Scouts en Gidsen
          </p>
          {user ? (
            <p className="text-lg text-blue-50 mb-8">
              Fijn je terug te zien, <span className="font-bold">{user.voornaam}</span>!
            </p>
          ) : (
            <p className="text-lg text-blue-50 mb-8 leading-relaxed">
              Een beweging vol avontuur, vriendschap en persoonlijke groei voor jongeren van alle leeftijden.
            </p>
          )}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {!user && (
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Nu Aanmelden
              </Link>
            )}
            <Link
              to="/kampen"
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
            >
              Bekijk Kampen
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-800 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">
              Wie zijn wij?
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              KSA (Katholicke Scouts en Gidsen) is een jeugdorganisatie met meer dan 100 jaar geschiedenis.
              We bieden jongeren de kans om te groeien, vriendschappen op te bouwen en onvergetelijke ervaringen
              op te doen door middel van scouts- en gidsactiviteiten.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Onze leden leren waarden als solidariteit, eerlijkheid, moed en respect, terwijl ze plezier hebben
              en nieuwe dingen ontdekken.
            </p>
          </div>
          <div>
            <img
              src="/src/images/3randomguys.webp"
              alt="KSA Leden"
              className="rounded-2xl shadow-lg w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Leeftijdsgroepen Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-12 text-center">
            Onze Leeftijdsgroepen
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 border-l-4 border-blue-500">
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Sloebers (6-8 jaar)
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                De jongste leden ontdekken scouting op een speelse manier met veel plezier en vriendschappen.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 border-l-4 border-green-500">
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">
                Paggaders (8-10 jaar)
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Meer verantwoordelijkheid en teamwork. Ze leren samenwerken en elkaar helpen.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 border-l-4 border-yellow-500">
              <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-4">
                Joro's (10-12 jaar)
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Avontuurlijker! Scouts en gidsen verkennen nieuwe activiteiten en nemen leiding op zich.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 border-l-4 border-red-500">
              <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                Knimmers & Sjo'ers (12-16 jaar)
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                De tieners groeien als persoon en nemen volledige rollen op als scouts en gidsen.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 border-l-4 border-purple-500 md:col-span-2">
              <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                +16 (Jongeren & Leiding)
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Jongeren nemen volledige leiderschap op en worden mentoren voor jongere groepen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Activiteiten Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-12 text-center">
            Wat we Doen
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="/src/images/kerstmarkt.webp"
                alt="Activiteiten"
                className="w-full h-64 object-cover rounded-xl shadow-md mb-6"
              />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Wekelijkse Bijeenkomsten
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Spellen, activiteiten en training in groepen op maat van de leeftijd.
              </p>
            </div>
            <div className="text-center">
              <img
                src="/src/images/matteoenvrouw.webp"
                alt="Kampementen"
                className="w-full h-64 object-cover rounded-xl shadow-md mb-6"
              />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Kampementen
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Onvergetelijke avonturen in de natuur, vol vriendschap en teamwork.
              </p>
            </div>
            <div className="text-center">
              <img
                src="/src/images/leiding.jpg"
                alt="Leiding"
                className="w-full h-64 object-cover rounded-xl shadow-md mb-6"
              />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Leiding & Mentors
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Ervaren leiders die jonge mensen inspireren en begeleiden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Klaar voor Avontuur?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Sluit je aan bij KSA en maak deel uit van een community vol vriendschap, groei en plezier!
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {!user && (
              <Link
                to="/register"
                className="bg-white text-blue-600 px-10 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Meld je Aan
              </Link>
            )}
            <Link
              to="/leiding"
              className="bg-blue-500 text-white px-10 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors border border-white"
            >
              Ontmoet onze Leiding
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-12 px-6 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              Alle Leeftijden Welkom
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Van 6 jaar tot volwassenen kunnen deelnemen.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              Inclusief & Veilig
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Iedereen is welkom. We bieden een veilige omgeving voor iedereen.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              Meer Informatie
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Neem contact op of bezoek ons op sociale media.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
