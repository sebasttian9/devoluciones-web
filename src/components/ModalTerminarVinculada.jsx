import React, {useState, useEffect, useContext} from 'react';
import {Modal, Button} from 'react-bootstrap';
import SpinnerGuardar from './SpinnerGuardar';
import { useNavigate  } from "react-router-dom";
import {Store} from '../store/Store';

const ModalGuardarFolio = ({idFolio}) => {

    const [show, setShow] = useState(false);
    const [logeado, setLogeado] = useContext(Store); 

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var navigate = useNavigate();

    const [guardado, setGuardado] = useState(false);
    const [mensaje, setMensaje] = useState('Enviando Folio...');
    const [detalle, setDetalle] = useState([]);

    // console.log(idFolio);


    const terminarFoliosVinculados = async() =>{

      handleShow();


        // obtengo los datos guardado en localstorage si existe (valido si existe seguimiento padre)
        const stringifiedPerson = localStorage.getItem('seguimiento');
        const seguimiento = JSON.parse(stringifiedPerson);
      //   let seg_padre = '';
      //   console.log(seguimiento);


      //   if(logeado.vinculada){

                    // Update seguimiento folio
              const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({seguimiento_padre: seguimiento.seguimiento_padre})
            };
            const response3 = await fetch('https://api-devoluciones.azurewebsites.net/api/devoluciones/updateFoliosVinculados', requestOptions);
            const data3 =  await response3.json(); 
            console.log(data3);
                 
      //   }
          
        if(typeof data3 ==='number'){
         

          localStorage.removeItem('empresa');
          localStorage.removeItem('seguimiento');
          setGuardado();
          setMensaje('folio Guardado!');
          // setTimeout(()=>{
              handleClose();
              navigate('/FolioCreado',{ state: { 
                                      id: '000',
                                      idFolio: idFolio,
                                      padre: seguimiento.seguimiento_padre, 
                                      vinculada : logeado.vinculada,
                                      cantidad_folios2: logeado.folios_vinculados,
                                      cantidad_folios: logeado.folios_vinculados 
                                  } });
          // },1000);

        }

      
  }


    useEffect(() => {

      
      // terminarFoliosVinculados();

    }, []);
    
    


  return (
    
    <>

{/* {
    productosSeleccionados.length ? 
    
    (<Button type={'button'} className="btn btn-success"   onClick={()=>(enviarDetalleFolio())}>Guardar folio</Button>) 
    
    : 
    
    (<Button type={'button'} className="btn btn-success" disabled   onClick={()=>(enviarDetalleFolio())}>Guardar folio</Button>)
} */}


    {/* <Button type={'button'} className="btn btn-success"   >Ver detalle</Button> */}
    {/* <button type="button" className="btn btn-primary btn-sm" onClick={()=>(handleShow())}>Ver detalle</button> */}
    <button className="btn btn-primary" type='button' value="continuar" onClick={()=>(terminarFoliosVinculados())}>Terminar dev vinculada</button>

      <Modal show={show} onHide={handleClose} > {/* size="lg" centered --> */} 
        <Modal.Header closeButton>
          <Modal.Title>{mensaje}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                
            {
                guardado ? (<div style={{margin:'auto',textAlign: 'center'}} ><img  src='../../img/circulo-verde.png' width={'100px'} /></div>)  : (<SpinnerGuardar mensaje={'Procesando...'}/>) 
            }
                
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

export default ModalGuardarFolio