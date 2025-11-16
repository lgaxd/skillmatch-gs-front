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

const Recomendacoes = lazy(() =>
  import("./pages/recomendacoes").then((module) => ({
    default: module.Recomendacoes,
  }))
);

const Dashboard = lazy(() =>
  import("./pages/dashboard").then((module) => ({
    default: module.Dashboard,
  }))
);

const Ranking = lazy(() =>
  import("./pages/ranking").then((module) => ({
    default: module.Ranking,
  }))
);

const Perfil = lazy(() =>
  import("./pages/perfil").then((module) => ({
    default: module.Perfil,
  }))
);

const Sobre = lazy(() =>
  import("./pages/sobre").then((module) => ({
    default: module.Sobre,
  }))
);

const Integrantes = lazy(() =>
  import("./pages/integrantes").then((module) => ({
    default: module.Integrantes,
  }))
);

const FAQ = lazy(() =>
  import("./pages/faq").then((module) => ({
    default: module.FAQ,
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
          <Route path="/recomendacoes" element={<Recomendacoes />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/integrantes" element={<Integrantes />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
