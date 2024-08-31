import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import TemplateGenerator from "../pages/TemplateGenerator";
import TemplateRenderer from "../pages/TemplateRenderer";
import TemplateRendererCustomer from "../pages/TemplateRendererCustomer";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="template-generator" element={<TemplateGenerator />} />
          <Route path="template-renderer/:id" element={<TemplateRenderer />} />
          <Route
            path="template-renderer-customer/:id"
            element={<TemplateRendererCustomer />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
