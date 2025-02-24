//import {Ejemplo01} from './componentes/ejemplo'
//import { HomeProductos } from "./componentes/producto";

import {BrowserRouter} from "react-router-dom"
import {Rutas} from "./routes"
function App() {
  return (
    <div>
      {/* <Ejemplo01 /> */}
      {/* <HomeProductos/> */}
      <BrowserRouter>
      <Rutas />
      </BrowserRouter>
    </div>
  );
}

export default App;
