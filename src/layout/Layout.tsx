import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
