import React from "react";
import { RouterProvider } from "react-router-dom";
 // Adjust path to where your router is defined
import "@mantine/core/styles.css";
import { router } from "./Route";

export default function App() {
  return <RouterProvider router={router} />;
}
