import NavBar from "../Components/AppShellWidget";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../Components/Footer";

import HelmetComponent from "../Components/HelmetComponent";
export default function HomePage() {
  return (
    <>
      <NavBar />
      <ScrollRestoration />
      <HelmetComponent title="Home" description="Welcome to Crisp Katsu, your go-to destination for delicious katsu dishes!" />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
