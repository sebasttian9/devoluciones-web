import React, {useState} from 'react';
import ModalDetalleFolio from './ModalDetalleFolio';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import jsPDF from 'jspdf';
import "jspdf-barcode";
import ModalDetalleNC from './ModalDetalleNC';

const ListadoFolios = ({devoluciones}) => {


  const  generatePDF = (num_seg,padre) => {

console.log(num_seg, padre);

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
    if(padre!=='' && padre!==null && padre!=='null'){

      doc.text(180, 100, `Num de seguimiento : ${padre}`)
      barra = padre;
    }else{
      doc.text(180, 100, `Num de seguimiento : ${num_seg}`)
      barra = num_seg;
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


    const codigoBarraHD = () => {

      var doc = new jsPDF('p', 'pt');
    
      var img = new Image();
      // img.src = '../../img/automarco.jpg'; 
      // doc.addImage(img, 'png', 250, 280, 100, 30);
      // doc.addImage(img, 'png', 250, 25, 100, 30);
      doc.rect(125, 20, 350, 150); // empty square  H, V , W , H 
  
      doc.setFontSize(22);
      doc.setFont('helvetica')
      doc.text(205, 55, '92522-5 * 1 UNID')
  
      doc.setFontSize(15);
      doc.setFont('helvetica')
  
  
        doc.text(150, 80, `BATERIA MOTO YTX-7L-BS 7AM 175 CCA`)
        doc.setFontSize(10);
        doc.text(280, 150, '925225')
     
      doc.barcode(`925225`, {
        fontSize: 60,
        textColor: "#000000",
        x: 230,
        y: 140
      }) 


  
      // doc.line(475, 160, 125, 160);
  
      // doc.setFontSize(15);
      // doc.setFont('helvetica')
      // // doc.setFontType('normal')
      // doc.text(165, 190, `Retorno a :`)
      // doc.setFontSize(12);
      // doc.text(165, 210, `Holding Automarco`)     
      // doc.text(165, 230, `Dirección : LAS ESTERAS NORTE 2541`)
      // doc.text(165, 250, `Comuna : QUILICURA`)
      // doc.text(165, 270, `Departamento : Devoluciones`)     
  
      
      doc.save('etiquetaEnvio.pdf')

    }


  // console.log('fecha -->',devoluciones[0].Fecha_recepcion);
  // console.log(moment(devoluciones[0].Fecha_recepcion).utc().format('DD-MM-YYYY'));

  const [pageNumber,setPageNumber] = useState(0); 

  const devoPerPage = 10;
  const pagesVisited = pageNumber * devoPerPage;
  // 40 -> 50
  const displayDevo = devoluciones
    .slice(pagesVisited, pagesVisited + devoPerPage)
    .map((item, index) => {
        console.log(index);
      return (
      <>   
                <tr key={index}>
                    {/* <td>{item.id_folio}</td> */}
                    <td>{item.id_numero_seguimiento  }</td>
                    {/* <td>{item.num_seg_padre !== 'null' ? item.num_seg_padre : ''}</td> */}
                    <td>{moment(item.Fecha_recepcion).utc().format('DD-MM-YYYY')}</td>
                    <td>{item.motivo_corto}</td>
                    <td><span title={item.descripcion}>{item.estado}</span></td>
                    {/* <td>{item.nota_credito==='0' ? '--' : item.nota_credito}</td>
                    <td>{item.fecha_ncredito}</td>
                    <td>{item.neto_ncredito}</td> */}
                    <td>{item.nota_pedido}</td>
                    <td><ModalDetalleFolio idFolio={item.id_folio} /></td>
                    <td><ModalDetalleNC nota={item.nota_credito} fecha={item.fecha_ncredito} neto={item.neto_ncredito} /></td>
                    <td><button type="button" className="btn btn-secondary btn-sm" value='Etiqueta' onClick={()=>(generatePDF(item.id_numero_seguimiento,item.num_seg_padre))}>Etiqueta envio</button></td>
                    {/* <td><button type="button" className="btn btn-secondary btn-sm" value='Etiqueta' onClick={()=>(codigoBarraHD())}>barra</button></td> */}
                </tr>    
        </>
      )      
    })

    const pageCount = Math.ceil(devoluciones.length / devoPerPage);
    // de divide la cantidad de devoluciones por la cantidad de devoluciones por pagina y se redondea hacia arriba
    
    // funcion para cambiar de pagina
    const changePage = ({selected}) => {

        setPageNumber(selected);
    } 


  return (
    <>
    {displayDevo}
    <tr>
      <td colSpan={8}>
        <div>
        <ReactPaginate 
          previousLabel={"Anterior"}
          nextLabel={"Siguiente"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination mt-5"}
          pageLinkClassName={"page-link"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          nextClassName={"page-item"}
          disabledClassName={"disabled"}
          activeClassName={"active"}
          renderOnZeroPageCount={null}
          pageClassName={"page-item"}
          previousClassName={"page-item"}
        />
        </div>
      </td>
    </tr>
    
    </>
  )
}

export default ListadoFolios