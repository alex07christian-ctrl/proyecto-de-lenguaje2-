import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { INVENTARIO } from "./PAGINAS/INVENTARIO";
import { NAVEGACION } from "./COMPONENTES/NAVEGACION";
import { AÑADIR } from "./PAGINAS/AÑADIR";
import { NOMINA } from "./PAGINAS/NOMINA";
import { HOGAR } from "./PAGINAS/HOGAR";
import { AÑADIR_NOMINA } from "./PAGINAS/AÑADIR_NOMINA";
import { LOGIN } from "./PAGINAS/LOGIN";
import { CONFIGURAR_ACCESO } from "./PAGINAS/CONFIGURAR_ACCESO";

const App = () => {
  const isAuthenticated = !!localStorage.getItem('session_token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <LOGIN /> : <Navigate to="/" />} />

        <Route path="/" element={isAuthenticated ? <NAVEGACION /> : <Navigate to="/login" />}>
          <Route index element={<HOGAR />} /> 
          <Route path="t" element={<INVENTARIO />} />
          <Route path="n" element={<NOMINA />} />
          <Route path="l" element={<AÑADIR />} />
          <Route path="l/:id" element={<AÑADIR />} />
          <Route path="n_añadir" element={<AÑADIR_NOMINA />} />
          <Route path="n_añadir/:id" element={<AÑADIR_NOMINA />} />
          
          <Route path="seguridad" element={<CONFIGURAR_ACCESO />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;