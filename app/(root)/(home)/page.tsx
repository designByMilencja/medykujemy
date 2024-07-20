import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strona główna | Aplikacja Medykuj",
  description:
    "Medykuj to aplikacja mieszcząca oferty pracy i procedury dla zawodów medycznych.",
};

const Home = async () => {
  return <h1> Działa</h1>;
};

export default Home;
