function About() {
  return (
    <div className="p-8 text-center max-w-4xl mx-auto">

      <h2 className="text-3xl font-bold mb-6 text-[#004C97]">Over Ons</h2>

      <div className="mb-12">
        <p className="text-lg text-gray-700 leading-relaxed">
          KSA Hillegem is een jeugdbeweging waar plezier, vriendschap en avontuur centraal staan! 
          Elke zaterdag trekken we eropuit om samen te spelen, te ravotten en nieuwe dingen te ontdekken. 
          We delen onvergetelijke momenten, bouwen aan sterke vriendschappen en leren samenwerken in een 
          warme en hechte groep. 
        </p>
      </div>
      <h2 className="text-3xl font-bold mb-6 text-center text-[#004C97]">
        Onze ligging
      </h2>
      <p className="text-center text-gray-700 mb-6">
        Onze activiteiten worden gegeven aan ons lokaal op speteveld 67a hillegem.
      </p>
      <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
        <iframe src={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1095.9625934619758!2d3.' +
        '871986141541089!3d50.90067755026814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47' +
        'c3a12e4dcf154d%3A0x9b90f9e4f83adb03!2sKSA%20Hillegem!5e0!3m2!1snl!2sbe!4v1760799379125!5m2!1snl!2sbe'}

        width="100%" 
        height="100%" 
        className="border-0"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

    </div>
  );
}

export default About;
