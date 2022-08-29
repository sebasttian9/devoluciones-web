import React, {useContext, useState, useEffect} from 'react'
import { Link, Route, useLocation  } from "react-router-dom";
import jsPDF from 'jspdf';
import "jspdf-barcode";
import {Store} from '../store/Store';


const FolioCreado = () => {

  const [logeado, setLogeado] = useContext(Store); 
  const [segui_padre, setSegui_padre] = useState('');
  

  // obtengo los datos guardado en localstorage si existe (valido si existe seguimiento padre)
  // const stringifiedPerson = localStorage.getItem('seguimiento');
  // const seguimiento = JSON.parse(stringifiedPerson);
  // setSegui_padre(seguimiento.seguimiento_padre);



          useEffect(() => {
        
            // Actualizamos el estado general del context para sumar cantidad de item y cant de folios.
            setLogeado({
              ...logeado,
              vinculada: false,
              folios_vinculados: 0,
              cant_productos:  0
          });            
    
            // return () => {
            //     cleanup
            // };
        }, []);          

  const  generatePDF = () => {



    var doc = new jsPDF('p', 'pt');
    
    var img = new Image();
    img.src = '../../img/automarco.jpg'; 
    // doc.addImage(img, 'png', 250, 280, 100, 30);
    doc.addImage(img, 'png', 250, 25, 100, 30);
    doc.rect(125, 20, 350, 300); // empty square  H, V , W , H 

    doc.setFontSize(22);
    doc.setFont('helvetica')
    doc.text(205, 80, 'Etiqueta de envio')

    doc.setFontSize(15);
    doc.setFont('helvetica')

    let barra = '';
    // doc.setFontType('normal')
    if(state.vinculada){

      doc.text(180, 100, `Num de seguimiento : ${state.padre}`)
      barra = state.padre;
    }else{
      doc.text(180, 100, `Num de seguimiento : ${state.id}`)
      barra = state.id;
    }
    
    doc.barcode(`${barra}`, {
      fontSize: 40,
      textColor: "#000000",
      x: 250,
      y: 148
    }) 

    doc.line(475, 160, 125, 160);

    doc.setFontSize(15);
    doc.setFont('helvetica')
    // doc.setFontType('normal')
    doc.text(165, 190, `Retorno a :`)
    doc.setFontSize(12);
    doc.text(165, 210, `Holding Automarco`)     
    doc.text(165, 230, `Dirección : LAS ESTERAS NORTE 2541`)
    doc.text(165, 250, `Comuna : QUILICURA`)
    doc.text(165, 270, `Departamento : Devoluciones`)     

    
    doc.save('etiquetaEnvio.pdf')
    }

    const { state } = useLocation();

  console.log(state);

  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col-12'>
            
            <div class="card">
              <div class="card-body">
                <h2>{ state.vinculada ? `Folios (${state.cantidad_folios2}) ingresado(s) exitosamente` : `Folio ingresado exitosamente` }</h2>
                <p className='display-6 mb-3'>Para más informacion dirigase a <Link to={'/MisDevoluciones'} >Mis devoluciones</Link></p>  
                
                <div className="alert alert-warning mt-5" role="alert">
                  {/* <p><b>NOTA:</b> Para agilizar el proceso de devolucion se solicita imprimir y pegar o escribir en el paquete a devolver el siguiente codigo (<b>{state.id}</b>) asociado a su folio n° {state.idFolio}</p> */}
                  <p>Estimado cliente, Envie su(s) paquete(s) de devolución con la etiqueta pegada encima o escriba sobre el(los) paquete(s) de manera visible este codigo:(<b>{ state.vinculada ? state.padre : state.id }</b>)</p>
                  {/* <BarcodeStrip value={state.id}/> CODIGO DE BARRA EN WEB */}
                  <p><button type="button" className="btn btn-primary btn-sm" onClick={()=>generatePDF()}>Descargar Etiqueta</button></p>
                </div>
              </div>
            </div>
        </div>

      </div>
        
    </div>
  )
}

export default FolioCreado