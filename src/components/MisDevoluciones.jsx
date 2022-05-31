import React from 'react'
import { useState, useEffect } from 'react';
import ListadoFolios from './ListadoFolios';
import Spinner from './Spinner';

const MisDevoluciones = () => {


  const [devoluciones, setDevoluciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerMotivosDev = async() =>{


    const url = "https://api-devoluciones.azurewebsites.net/api/devoluciones/foliosCliente/76.098.370-5";
    const resp = await fetch(url);
    const data = await resp.json();
    setDevoluciones(data);

}


useEffect(() => {

        
  obtenerMotivosDev();

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
                          devoluciones.length ? (<ListadoFolios devoluciones={devoluciones}></ListadoFolios>) : (<Spinner mensaje={'Cargando..'}/>)
                        }
                    </tbody>
                    </table> 
                    </div> 
    </div>
      
    </>
  )
}

export default MisDevoluciones