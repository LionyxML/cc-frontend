import React from "react";
import { Routes, Route } from "react-router";
import { NavBar } from "./components";
import {
  LoginPage,
  RegisterPage,
  ProfilePage,
  ComparatorsPage,
  CertificatesPage,
  NotFoundPage,
  Home,
  ProductsPage,
  PlansPage,
  ContactsPage,
} from "./pages";

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="comparator" element={<ComparatorsPage />} />
        <Route path="certificates" element={<CertificatesPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="plans" element={<PlansPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
