
import './App.css';
import Cuenta from './components/Cuenta';
import MisDevoluciones from './components/MisDevoluciones';
import FolioCreado from './components/FolioCreado';
import Nabvar from './components/Nabvar';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from 'react-router-dom';
import Inicio from './components/Inicio';
import CrearDevolucion from './components/CrearDevolucion';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nabvar/>
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path="/cuenta" element={<Cuenta/>} />
          <Route path="/crearDev" element={<CrearDevolucion/>} />
          <Route path="/MisDevoluciones" element={<MisDevoluciones/>} />
          <Route path="/FolioCreado" element={<FolioCreado/>} />
          <Route path="*" element={'Ruta no encontrada'} />           
        </Routes>
      </BrowserRouter>
        
    </div>
  );
}

export default App;
