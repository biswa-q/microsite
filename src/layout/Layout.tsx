import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      <footer className="container mx-auto px-4 py-4">
        <p>© 2024 My Website</p>
      </footer>
    </div>
  );
};

export default Layout;
