import React from "react";
import { Routes, Route } from "react-router";
import {
  LoginPage,
  RegisterPage,
  ProfilePage,
  ComparatorsPage,
  CertificatesPage,
  NotFoundPage,
} from "./pages";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="comparator" element={<ComparatorsPage />} />
      <Route path="certificates" element={<CertificatesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
