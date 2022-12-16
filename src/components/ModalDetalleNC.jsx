import React, {useState, useEffect} from 'react';
import {Modal, Button} from 'react-bootstrap';
import SpinnerGuardar from './SpinnerGuardar';
import { useNavigate  } from "react-router-dom";

const ModalDetalleNC = ({nota,fecha, neto}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var navigate = useNavigate();

    const [guardado, setGuardado] = useState(false);
    const [mensaje, setMensaje] = useState('Informacion Nota de credito');
    const [detalle, setDetalle] = useState([]);

    // console.log(idFolio);
// console.log(nota, fecha, neto);

  //   const obtenerDetalleFolio = async() =>{


  //     const url = "https://api-devoluciones.azurewebsites.net/api/devoluciones/detalleFolio/"+idFolio;
  //     const resp = await fetch(url);
  //     const data = await resp.json();
  //     setDetalle(data);
  //     console.log(data);
  //     // console.log(url);
  // }


  //   useEffect(() => {

      
  //     obtenerDetalleFolio();

  //     // return () => {
  //     //     cleanup
  //     // };
  //   }, []);
    
    


  return (
    
    <>

{/* {
    productosSeleccionados.length ? 
    
    (<Button type={'button'} className="btn btn-success"   onClick={()=>(enviarDetalleFolio())}>Guardar folio</Button>) 
    
    : 
    
    (<Button type={'button'} className="btn btn-success" disabled   onClick={()=>(enviarDetalleFolio())}>Guardar folio</Button>)
} */}


    {/* <Button type={'button'} className="btn btn-success"   >Ver detalle</Button> */}
    <button type="button" className="btn btn-info btn-sm" onClick={()=>(handleShow())}>Info N/C</button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{mensaje}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                
                <div className="col-12 mt-3" style={{border:'1px solid #adb5bd',padding: '1rem',borderRadius: '6px'}}>
                        {/* <span className='float-start mb-4'>Resultados de busqueda</span> */}
                    <table className="table ">
                    <thead>
                        <tr>
                        
                        <th scope="col">Nota de credito</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Valor neto</th>
                        {/* <th scope="col">Factura</th>                           */}
                        {/* <th scope="col">Detalle</th> */}
                        </tr>
                    </thead>
                    <tbody>
                      {
                          

                            <tr key={1}>
                              <td>{nota  ? nota : 'Sin informacion'}</td>
                              <td>{fecha ? fecha : 'Sin informacion'}</td>
                              <td>{neto ? neto : 'Sin informacion'}</td>
                              {/* <td>{item.num_factura}</td> */}
                              {/* <td>{item.id_folio}</td> */}
                            </tr>
                            
                        
                      }

                    </tbody>
                    </table> 
                    </div>                
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  )
}

export default ModalDetalleNC