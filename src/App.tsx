import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loading } from "./components/loading";

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

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading message="Carregando página..." />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
