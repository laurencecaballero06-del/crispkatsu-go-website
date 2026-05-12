import NavBar from "../Components/AppShellWidget";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../Components/Footer";
export default function HomePage() {
  return (
    <>
      <NavBar />
      <ScrollRestoration />

      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
