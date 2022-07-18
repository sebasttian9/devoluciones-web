
import './App.css';
import Cuenta from './components/Cuenta';
import MisDevoluciones from './components/MisDevoluciones';
import FolioCreado from './components/FolioCreado';
import Nabvar from './components/Nabvar';
import LoginCliente from './components/LoginCliente';
import {Store} from './store/Store';
import CerrarSesion from './components/CerrarSesion';
import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from 'react-router-dom';
import Inicio from './components/Inicio';
import CrearDevolucion from './components/CrearDevolucion';


function App() {

  const [logeado, setLogeado] = useState({
    user: {},
    estado: false,
  });


  const validarLocalStorage = () => {

         // obtengo los datos guardado en localstorage
         const stringifiedPerson = localStorage.getItem('user');
         const personAsObjectAgain = JSON.parse(stringifiedPerson);

         console.log(personAsObjectAgain);
         if(personAsObjectAgain){

              setLogeado({
                  user: personAsObjectAgain,
                  estado: true,
              });
          }else{
            setLogeado({
              user: {},
              estado: false,
            });
          }
  }



  useEffect(() => {
    validarLocalStorage();
    // return () => {
    //   cleanup
    // };
  }, []);
  // const [data,setData] = useState({
  //   items: [],
  //   cantidad: 0,
  // });

  return (
    <div className="App">
    <Store.Provider value={[logeado,setLogeado]}>
      <BrowserRouter>
        <Nabvar/>
        <Routes>
          <Route path='/Login' element={  <LoginCliente />} />
          <Route path='/' element={ logeado.estado ? <Inicio /> : <LoginCliente/> } />
          <Route path="/cuenta" element={ logeado.estado ? <Cuenta/> : <LoginCliente />} />
          <Route path="/crearDev" element={ logeado.estado ? <CrearDevolucion/> : <LoginCliente /> } />
          <Route path="/MisDevoluciones" element={ logeado.estado ? <MisDevoluciones/> : <LoginCliente /> } />
          <Route path="/FolioCreado" element={<FolioCreado/>} />
          <Route path="/cerrarSesion" element={<CerrarSesion/>} />
          <Route path="*" element={'Ruta no encontrada'} />           
        </Routes>
      </BrowserRouter>
      </Store.Provider>        
    </div>
  );
}

export default App;
