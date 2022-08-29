import React, {useState, useContext} from 'react';
import {Modal, Button} from 'react-bootstrap';
import SpinnerGuardar from './SpinnerGuardar';
import { useNavigate  } from "react-router-dom";
import { nanoid,customAlphabet } from 'nanoid';
import moment from 'moment';
import {Store} from '../store/Store';


const ModalGuardarFolio = ({productosSeleccionados,formatearProd, idFolio, setGuardado, setProductosSeleccinados, setProductos}) => {

    const [show, setShow] = useState(false);
    const [logeado, setLogeado] = useContext(Store); 

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var navigate = useNavigate();

    const [guardado2, setGuardado2] = useState(false);
    const [mensaje, setMensaje] = useState('Enviando Folio...');


    const devolucionVinculada = async() => {

      // crear opcion de devolucion vinculada (localhost o con estado)
      // AL ELEGIR VINCULADA, CREAR OTRO CODIGO PADRE DE SEGUIMIENTO Y GUARDAR EN LOCALSTORAGE PARA USAR EN TODOS LOS DEMAS MIENTRAS DURA EL PROCESO.
      handleShow();

          const inserts = productosSeleccionados.map(item => ({
            id_folio: idFolio,
            num_factura: parseInt(item.factura), 
            prod_id: formatearProd(item.prod_id),
            precio: item.precio,
            cantidad: parseInt(item.cantidad_devolver),
            descuento: item.descuento
        }));


        // Actualizamos el estado general del context para sumar cantidad de item y cant de folios.
        setLogeado({
          ...logeado,
          vinculada: true,
          cant_productos:  parseInt(logeado.cant_productos) + parseInt(productosSeleccionados.length)
      });


      console.log(logeado);

                // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inserts)
        };
        const response = await fetch('https://api-devoluciones.azurewebsites.net/api/devoluciones/saveDetalle', requestOptions);
        const data =  await response.json();


        //////////////////////////////// SI INSERTA DETALLE ACTUALIZO LOS ESTADOS, SEGUIMIENTO, SEGUIMIENTO PADRE, FECHA, ETC

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
          
        // Numero seguimiento Hijo
          const nanoid = customAlphabet('1234567890', 10);
          const num = nanoid();
          let seg_padre = '';

          // obtengo los datos guardado en localstorage si existe (valido si existe seguimiento padre)
          const stringifiedPerson = localStorage.getItem('seguimiento');
          const seguimiento = JSON.parse(stringifiedPerson);
          console.log(seguimiento);
          
          if(!seguimiento){ // si es falso, no tiene datos, creo el seguimiento padre

                            // numero seguimiento padre
                            const nanoid2 = customAlphabet('1234567890', 13);
                            seg_padre = nanoid2();

                            // creo objeto para guardar en localstorage
                            const objeto = {
                                'seguimiento_padre': seg_padre
                            };
                            // guardo objeto en localstorage
                            localStorage.setItem('seguimiento', JSON.stringify(objeto));  

          }else{ // Uso el objeto ya leido del localstorage

                        seg_padre = seguimiento.seguimiento_padre;
          }

        console.log(seg_padre);

          // Update seguimiento folio
          const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({seguimiento: num, folio: idFolio, seguimiento_padre: seg_padre })
          };
          const response2 = await fetch('https://api-devoluciones.azurewebsites.net/api/devoluciones/updateSegFolio', requestOptions);
          const data2 =  await response2.json();          
          // console.log('lalal',nanoid());
          // return;
            
          if(typeof data2 ==='number'){


            setProductosSeleccinados([]);
            setProductos([]);

            // localStorage.removeItem('empresa');
            setGuardado2(true);
            setMensaje('folio Guardado!');
            // setTimeout(()=>{
                setGuardado(false);
                handleClose();                
                navigate('/crearDev',{ state: { id: num, idFolio: idFolio } });
            // },500);

          }

        }        


    }
    
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
            }));

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
          let seg_padre = '';


          // obtengo los datos guardado en localstorage si existe (valido si existe seguimiento padre)
          const stringifiedPerson = localStorage.getItem('seguimiento');
          const seguimiento = JSON.parse(stringifiedPerson);
          console.log(seguimiento);
          
          if(seguimiento!==null){ // si es falso, no tiene datos, creo el seguimiento padre //seguimiento.seguimiento_padre && 

                        seg_padre = seguimiento.seguimiento_padre;

                        // Actualizamos el estado general del context para sumar cantidad de item y cant de folios.
                        setLogeado({
                          ...logeado,
                          vinculada: true,
                          cant_productos:  parseInt(logeado.cant_productos) + parseInt(productosSeleccionados.length)
                      });  
                      
                      console.log(`entro en proceso de suma ${logeado.folios_vinculados} + 1` );
          }          

          // Update seguimiento folio
          const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({seguimiento: num, folio: idFolio, seguimiento_padre: seg_padre, fin : 1 })
          };
          const response2 = await fetch('https://api-devoluciones.azurewebsites.net/api/devoluciones/updateSegFolio', requestOptions);
          const data2 =  await response2.json();          
          // console.log('lalal',nanoid());
          // return;


          if(logeado.vinculada){

                      // Update seguimiento folio
                const requestOptions = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({seguimiento_padre: seg_padre})
              };
              const response3 = await fetch('https://api-devoluciones.azurewebsites.net/api/devoluciones/updateFoliosVinculados', requestOptions);
              const data3 =  await response3.json(); 
              console.log(data3);
              // if(typeof data3 ==='number'){ localStorage.removeItem('seguimiento'); }      
          }
            
          if(typeof data2 ==='number'){

            localStorage.removeItem('seguimiento');
            localStorage.removeItem('empresa');
            setGuardado2(true);
            console.log('folios -->',logeado.folios_vinculados);
            setMensaje('folio Guardado!');
            setTimeout(()=>{
                handleClose();
                navigate('/FolioCreado',{ state: { 
                                                id: num, 
                                                idFolio: idFolio, 
                                                cantidad_folios: data3,
                                                cantidad_folios2: logeado.folios_vinculados,
                                                padre: seg_padre, 
                                                vinculada : logeado.vinculada                                                
                                        } });
            },2000);

          }

        }
    }


  return (
    
    <>

{
    productosSeleccionados.length ? 
    

    (<><div className='col-6'><Button type={'button'} className="btn btn-primary"   onClick={()=>(devolucionVinculada())}>Crear nueva dev vinculada</Button></div>
    <div className='col-6'><Button type={'button'} className="btn btn-success"   onClick={()=>(enviarDetalleFolio())}>Enviar y terminar</Button></div></>) 
    
    : 
    
    (<Button type={'button'} className="btn btn-success" disabled   onClick={()=>(enviarDetalleFolio())}>Enviar y terminar</Button>)
}


      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{mensaje}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                guardado2 ? (<div style={{margin:'auto',textAlign: 'center'}} ><img  src='../../img/circulo-verde.png' width={'100px'} /></div>)  : (<SpinnerGuardar mensaje={'Procesando...'}/>) 
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