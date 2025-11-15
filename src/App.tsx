import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loading } from "./components/loading";

const LandingPage = lazy(() =>
  import("./pages/landing-page").then((module) => ({
    default: module.LandingPage,
  }))
);

const NotFoundPage = lazy(() =>
  import("./pages/not-found").then((module) => ({
    default: module.NotFoundPage,
  }))
);

const LoginPage = lazy(() =>
  import("./pages/login").then((module) => ({
    default: module.LoginPage,
  }))
);

const Cadastro = lazy(() =>
  import("./pages/cadastro").then((module) => ({
    default: module.Cadastro,
  }))
);

const FormularioPerfil = lazy(() =>
  import("./pages/formulario-perfil").then((module) => ({
    default: module.FormularioPerfil,
  }))
);

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading message="Carregando página..." />}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/formulario-perfil" element={<FormularioPerfil />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
