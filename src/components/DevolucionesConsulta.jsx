import React from 'react'
import { useState, useEffect, useContext } from 'react';
import ListadoFoliosConsulta from './ListadoFoliosConsulta';

import Spinner from './Spinner';
import {Store} from '../store/Store';

const MisDevoluciones = () => {

  const [logeado, setLogeado] = useContext(Store);
  const [devoluciones, setDevoluciones] = useState([]);
  const [tablaDevoluciones, setTablaDevoluciones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  const obtenerDevoluciones = async() =>{

    setCargando(true)
    const url = "https://api-devoluciones.azurewebsites.net/api/devoluciones/foliosClientes";
    const resp = await fetch(url);
    const data = await resp.json();
    // console.log(data);
    setDevoluciones(data);
    setTablaDevoluciones(data);
    setCargando(false);

}

const handleChange = e => {

    setBusqueda(e.target.value);
    // filtrar(e.target.value);
    // console.log('Busca -> '+ e.target.value);
}

const buscar = () => {

  
  let texto = document.getElementById("txtBuscar").value;
  console.log(texto);

  let resultado = tablaDevoluciones.filter((elemento) =>{

      // console.log(elemento.Factura_boleta);
      if(elemento.Factura_boleta.toString().toLowerCase().includes(texto.toLowerCase()) 
      || elemento.id_numero_seguimiento.toString().toLowerCase().includes(texto.toLowerCase())
      || elemento.rut_cliente.toString().toLowerCase().includes(texto.toLowerCase())){
        return elemento;
      }

  })

  setDevoluciones(resultado);

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
      <h3 className='mt-3 mb-4'>Consultar devoluciones</h3>

      <div className='row mt-5'>
          {/* <div className="col-12"><input type="text" className="form-control" name="txtBuscar" width="200px" id="txtBuscar"/>
          <input type="button" className="btn btn-success" value="Buscar"/></div> */}

          <div className="input-group mb-3">
            <input type="text" value={busqueda} onChange={handleChange} id='txtBuscar' className="form-control" placeholder="Busqueda por Rut, factura, numero de devolucion" aria-label="Recipient's username" aria-describedby="button-addon2"/>
            <button className="btn btn-success" onClick={()=>(buscar())} type="button" id="button-addon2">Buscar</button>
          </div>
      </div>

      <div className="col-12 mt-5" style={{border:'1px solid #adb5bd',padding: '1rem',borderRadius: '6px'}}>
                        {/* <span className='float-start mb-4'>Resultados de busqueda</span> */}
                    <table className="table ">
                    <thead>
                        <tr>
                        
                        <th scope="col">Rut cliente</th>
                        <th scope="col">Numero devolucion</th>
                        <th scope="col">Factura</th>
                        <th scope="col">Fecha ingreso</th>
                        <th scope="col">Motivo</th>
                        <th scope="col">Estado</th>                            
                        <th scope="col">Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                        cargando ? (<Spinner mensaje={'Cargando..'}/>) : devoluciones.length ? (<ListadoFoliosConsulta devoluciones={devoluciones}></ListadoFoliosConsulta>) : (<tr><td colSpan={6}><b>No se encontraron folios</b></td></tr>) 
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