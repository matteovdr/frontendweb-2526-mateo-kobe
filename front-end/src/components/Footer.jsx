const Footer = () => {
  return (
    <footer className="bg-[#004C97] text-white p-4 shadow-md">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6 py-6 px-4 text-sm">

        <div>
          <h4 className="font-semibold mb-2">Contact hoofdleiding</h4>
          <p>
            Beau (hoofdleiding):{' '}
            <a
              href="tel:+320497431234"
              className="underline text-white hover:text-blue-200"
            >
              +32 0497 43 12 34
            </a>
          </p>
          <p>
            Lotte (hoofdleiding):{' '}
            <a
              href="tel:+320498442143"
              className="underline text-white hover:text-blue-200"
            >
              +32 0498 44 21 43
            </a>
          </p>
          <p className="mt-2">
            E-mail:{' '}
            <a
              href="mailto:ksa.hillegem@gmail.be"
              className="underline text-white hover:text-blue-200"
            >
              ksa.hillegem@gmail.be
            </a>
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Met dank aan onze sponsors</h4>
          <ul className="list-disc list-inside">
            <li>Slagerij Jos & Marleen</li>
            <li>Sofliecom Shop</li>
            <li>Pure garden</li>
            <li>Q wellness</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">KSA Hillegem</h4>
          <p>Speteveld 67A</p>
          <p>9550 Hillegem (Herzele)</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
