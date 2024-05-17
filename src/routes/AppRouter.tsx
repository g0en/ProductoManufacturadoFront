import { Route, Routes } from "react-router-dom";
import { ScreenPersona } from "../components/pages/ScreenPersona";
import { ScreenArticuloManufacturado } from "../components/pages/ScreenArticuloManufacturado"; // Importamos el componente ScreenPersona
import { NavBar } from "../components/ui/NavBar/NavBar"; // Importamos el componente NavBar
import { ScreenArticuloInsumo } from "../components/pages/ScreenArticuloInsumo";

// Componente AppRouter que define las rutas de la aplicación
export const AppRouter = () => {
  return (
    <>
      {/* Barra de navegación */}
      <NavBar />
      {/* Definición de las rutas */}
      <Routes>
        {/* Ruta para la pantalla de personas */}
        <Route path="/" element={<ScreenPersona />} />
        <Route path="/articulos-manufacturado" element={<ScreenArticuloManufacturado></ScreenArticuloManufacturado>}></Route>
        <Route path="/articulos-insumo" element={<ScreenArticuloInsumo></ScreenArticuloInsumo>}></Route>
      </Routes>
    </>
  );
};