import AppShellWidget from "../Components/AppShellWidget";
import { Outlet } from "react-router-dom";
export default function HomePage() {
  return (
    <>
      <AppShellWidget />
      <main>
        <Outlet />

        
      </main>
    </>
  );
}
