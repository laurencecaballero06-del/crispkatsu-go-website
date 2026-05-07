import AppShellWidget from "../Components/AppShellWidget";
import { Outlet } from "react-router-dom";
export default function HomePage() {
  return (
    <>
      <AppShellWidget />
      <main>
        <Outlet />

        <H1>Welcome to the HomePage</H1>
      </main>
    </>
  );
}
