import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import SpinnerGuardar from './SpinnerGuardar';
import { useNavigate  } from "react-router-dom";
import { nanoid,customAlphabet } from 'nanoid';
import moment from 'moment';


const ModalGuardarFolio = ({productosSeleccionados,formatearProd, idFolio}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var navigate = useNavigate();

    const [guardado, setGuardado] = useState(false);
    const [mensaje, setMensaje] = useState('Enviando Folio...');
    
    const enviarDetalleFolio = async() =>{

        handleShow();

        // return;
        
        // alert('Enviando detalle');
        // console.log(productosSeleccionados);

        const inserts = productosSeleccionados.map(item => ({
                id_folio: idFolio,
                num_factura: parseInt(item.factura), 
                prod_id: formatearProd(item.prod_id),
                precio: item.precio,
                cantidad: parseInt(item.cantidad_devolver),
                descuento: item.descuento
            }))

        // console.log('insert --> ',inserts);

        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inserts)
        };
        const response = await fetch('https://api-devoluciones.azurewebsites.net/api/devoluciones/saveDetalle', requestOptions);
        const data =  await response.json();

        // console.log(response);
        // console.log(data);
        // console.log(data[0]);
        // console.log(typeof(data[0]));

        if(typeof data[0] ==='number'){


          // Update nota de pedido y fecha de factura
        const requestOptions3 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({nota_pedido: productosSeleccionados[0].nota_pedido, fecha_factura: moment(productosSeleccionados[0].fecha_documento).utc().format('YYYY-MM-DD'), folio: idFolio, factura: productosSeleccionados[0].factura  })
        };
        const response3 = await fetch('https://api-devoluciones.azurewebsites.net/api/devoluciones/updateNotaPedido', requestOptions3);
        const data3 =  await response3.json();           
        // console.log('info update nota-->',data3);
          
          const nanoid = customAlphabet('1234567890', 10);
          const num = nanoid();

          // Update seguimiento folio
          const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({seguimiento: num, folio: idFolio })
          };
          const response2 = await fetch('https://api-devoluciones.azurewebsites.net/api/devoluciones/updateSegFolio', requestOptions);
          const data2 =  await response2.json();          
          // console.log('lalal',nanoid());
          // return;
            
          if(typeof data2 ==='number'){

            localStorage.removeItem('empresa');
            setGuardado(true);
            setMensaje('folio Guardado!');
            setTimeout(()=>{
                handleClose();
                navigate('/FolioCreado',{ state: { id: num, idFolio: idFolio } });
            },3000);

          }

        }
    }


  return (
    
    <>

{
    productosSeleccionados.length ? 
    
    (<Button type={'button'} className="btn btn-success"   onClick={()=>(enviarDetalleFolio())}>Enviar folio</Button>) 
    
    : 
    
    (<Button type={'button'} className="btn btn-success" disabled   onClick={()=>(enviarDetalleFolio())}>Enviar folio</Button>)
}


      

      <Modal show={show} onHide={handleClose}>
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