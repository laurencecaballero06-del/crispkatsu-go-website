import AppShellWidget from "../Components/AppShellWidget";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
export default function HomePage() {
  return (
    <>
      <AppShellWidget />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
