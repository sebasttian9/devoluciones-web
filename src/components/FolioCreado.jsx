import React from 'react'
import { Link, Route, useLocation  } from "react-router-dom";
import jsPDF from 'jspdf';


const FolioCreado = () => {

  const  generatePDF = () => {
    var doc = new jsPDF('p', 'pt');
    
    doc.rect(125, 20, 350, 300); // empty square  H, V , W , H 

    doc.setFontSize(22);
    doc.setFont('helvetica')
    doc.text(205, 60, 'Etiqueta de envio')

    doc.setFontSize(15);
    doc.setFont('helvetica')
    // doc.setFontType('normal')
    doc.text(180, 100, `Num de seguimiento : ${state.id}`)     

    doc.line(475, 130, 125, 130);

    doc.setFontSize(15);
    doc.setFont('helvetica')
    // doc.setFontType('normal')
    doc.text(165, 170, `Retorno a :`)
    doc.setFontSize(12);
    doc.text(165, 190, `Holding Automarco`)     
    doc.text(165, 210, `Dirección : Las esteras norte 2541`)
    doc.text(165, 230, `Comuna : Quilicura`)
    doc.text(165, 250, `Departamento : Devoluciones`)     

    
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
                <p className='display-6 mb-3'> Folio ingresado exitosamente, para más informacion dirigase a <Link to={'/MisDevoluciones'} >Mis devoluciones</Link></p>  
                
                <div className="alert alert-warning mt-3" role="alert">
                  <p><b>NOTA:</b> Para agilizar el proceso de devolucion se solicita imprimir y pegar o escribir en el paquete a devolver el siguiente codigo (<b>{state.id}</b>) asociado a su folio n° {state.idFolio}</p>
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