import NavBar from "../Components/AppShellWidget";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
export default function HomePage() {
  return (
    <>
      <NavBar /> // This is the NavBar component that will be displayed on all pages(Exclude the cart page)
      <main>
        <Outlet />
      </main>
      <Footer /> // This is the Footer component that will be displayed on all pages
    </>
  );
}
