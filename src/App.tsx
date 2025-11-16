import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loading } from "./components/loading";
import { Layout } from "./components/layout";

// Páginas com Layout (autenticadas)
const Dashboard = lazy(() =>
  import("./pages/dashboard").then((module) => ({
    default: module.Dashboard,
  }))
);

const Trilha = lazy(() =>
  import("./pages/trilha").then((module) => ({
    default: module.Trilha,
  }))
);

const Recomendacoes = lazy(() =>
  import("./pages/recomendacoes").then((module) => ({
    default: module.Recomendacoes,
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

// Páginas sem Layout (públicas)
const LandingPage = lazy(() =>
  import("./pages/landing-page").then((module) => ({
    default: module.LandingPage,
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

const NotFoundPage = lazy(() =>
  import("./pages/not-found").then((module) => ({
    default: module.NotFoundPage,
  }))
);

// Componente para páginas com layout
function WithLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}

// Componente para páginas sem layout
function WithoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading message="Carregando página..." />}>
        <Routes>
          {/* Páginas públicas sem layout */}
          <Route path="/" element={<WithoutLayout><LandingPage /></WithoutLayout>} />
          <Route path="/login" element={<WithoutLayout><LoginPage /></WithoutLayout>} />
          <Route path="/cadastro" element={<WithoutLayout><Cadastro /></WithoutLayout>} />
          <Route path="/formulario-perfil" element={<WithoutLayout><FormularioPerfil /></WithoutLayout>} />
          <Route path="/sobre" element={<WithoutLayout><Sobre /></WithoutLayout>} />
          <Route path="/integrantes" element={<WithoutLayout><Integrantes /></WithoutLayout>} />
          <Route path="/faq" element={<WithoutLayout><FAQ /></WithoutLayout>} />
          
          {/* Páginas autenticadas com layout */}
          <Route path="/dashboard" element={<WithLayout><Dashboard /></WithLayout>} />
          <Route path="/trilha/:idCarreira" element={<WithLayout><Trilha /></WithLayout>} />
          <Route path="/recomendacoes" element={<WithLayout><Recomendacoes /></WithLayout>} />
          <Route path="/ranking" element={<WithLayout><Ranking /></WithLayout>} />
          <Route path="/perfil" element={<WithLayout><Perfil /></WithLayout>} />
          
          {/* 404 */}
          <Route path="*" element={<WithoutLayout><NotFoundPage /></WithoutLayout>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;