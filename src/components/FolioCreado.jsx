import React from 'react'
import { Link, Route, useLocation  } from "react-router-dom";


const FolioCreado = () => {

  const { state } = useLocation();

  console.log(state);

  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col-12'>
            
            <div class="card">
              <div class="card-body">
                <p className='display-6 mb-3'> Folio ingresado exitosamente, para más informacion dirigase a <Link to={'/MisDevoluciones'} >Mis devoluciones</Link></p>  
                
                <div className="alert alert-warning mt-3" role="alert">
                  <p><b>NOTA:</b> Para agilizar el proceso de devolucion se solicita imprimir y pegar o escribir en el paquete a devolver el siguiente codigo (<b>{state.id}</b>) asociado a su folio n° {state.idFolio}</p>
                </div>
              </div>
            </div>
        </div>

      </div>
        
    </div>
  )
}

export default FolioCreado