import React from "react";

const Footer = ({ className = "" }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`flex flex-col gap-6 bg-dark-400 px-6 py-4 text-center text-white ${className}`}
    >
      <div>
        <p>
          &copy; {currentYear}{" "}
          <a
            href="https://medykuj.pl"
            className="text-primary-500 hover:underline"
          >
            Medykujemy.pl
          </a>
          . Wszelkie prawa zastrzeżone.
        </p>
        <p>
          Śledź nas na{" "}
          <a href="https://facebook.com" className="text-white hover:underline">
            Facebooku
          </a>{" "}
          i{" "}
          <a
            href="https://instagram.com"
            className="text-white hover:underline"
          >
            Instagramie
          </a>
          .
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 text-xs">
        <p className="max-w-[1200px] text-center">
          © Zgodnie z Ustawa z dnia 4 lutego 1994 r. o prawie autorskim i
          prawach pokrewnych (t.j. Dz.U.2021.1062 t.j. z dnia 2021.06.14). o
          ochronie praw autorskich, materiały zawarte na stronie www.medykuj.pl
          w całości są własnością administratorów. Przekazywane informacje mogą
          być wykorzystywane wyłącznie w celach związanych z pracą własną, na
          podstawie informacji i materiałów uzyskanych na
          warsztatach/webinarach/aplikacji oraz nie mogą być przeprowadzane
          szkolenia wewnętrzne ani zewnętrzne o charakterze zarobkowym.
        </p>
        <div className="flex gap-4">
          <p>
            Ikonki źródło <a href="https://ionic.io/ionicons">Ionicons</a>
          </p>
          <p>
            Obrazki źródło <a href="https://pixabay.com/">Pixabay</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
