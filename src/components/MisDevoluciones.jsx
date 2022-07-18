import React from 'react'
import { useState, useEffect, useContext } from 'react';
import ListadoFolios from './ListadoFolios';
import Spinner from './Spinner';
import {Store} from '../store/Store';

const MisDevoluciones = () => {

  const [logeado, setLogeado] = useContext(Store);
  const [devoluciones, setDevoluciones] = useState([]);
  const [cargando, setCargando] = useState(false);

  const obtenerDevoluciones = async() =>{

    setCargando(true)
    const url = "https://api-devoluciones.azurewebsites.net/api/devoluciones/foliosCliente/"+logeado.user.cli_rut;
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);
    setDevoluciones(data);
    setCargando(false);

}


useEffect(() => {

        
  obtenerDevoluciones();

  // return () => {
  //     cleanup
  // };
}, []);


  return (
    <>
    <div className='container'>
      <h3 className='mt-3'>Mis devoluciones</h3>

      <div className="col-12 mt-5" style={{border:'1px solid #adb5bd',padding: '1rem',borderRadius: '6px'}}>
                        {/* <span className='float-start mb-4'>Resultados de busqueda</span> */}
                    <table className="table ">
                    <thead>
                        <tr>
                        
                        <th scope="col">id</th>
                        <th scope="col">Numero devolucion</th>
                        <th scope="col">Fecha ingreso</th>
                        <th scope="col">Motivo</th>
                        <th scope="col">Estado</th>                            
                        <th scope="col">Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                        cargando ? (<Spinner mensaje={'Cargando..'}/>) : devoluciones.length ? (<ListadoFolios devoluciones={devoluciones}></ListadoFolios>) : (<tr><td colSpan={6}><b>No se encontraron folios</b></td></tr>) 
                      }
                        {/* {
                          devoluciones.length ? (<ListadoFolios devoluciones={devoluciones}></ListadoFolios>) : (<Spinner mensaje={'Cargando..'}/>)
                        } */}
                    </tbody>
                    </table> 
                    </div> 
    </div>
      
    </>
  )
}

export default MisDevoluciones