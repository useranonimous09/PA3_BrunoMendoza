import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import AdminRopa from "./pages/AdminRopa";
import { Navigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();

  const irEntrada = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const irRopa = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("catalogo")?.scrollIntoView({
        behavior: "smooth"
      });
    }, 100);
  };

  return (
    <>
      <Header
        onEntrada={irEntrada}
        onRopa={irRopa}
        onLogin={() => navigate("/login")}
      />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />

<Route
  path="/admin"
  element={
    sessionStorage.getItem("token") ? (
      <AdminRopa />
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>

      <Route path="*" element={<Home />} />
    </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;