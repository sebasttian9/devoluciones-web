import React, {useState} from 'react';
import ModalDetalleFolio from './ModalDetalleFolio';
import moment from 'moment';
import ReactPaginate from 'react-paginate';


const ListadoFolios = ({devoluciones}) => {



  // console.log('fecha -->',devoluciones[0].Fecha_recepcion);
  // console.log(moment(devoluciones[0].Fecha_recepcion).utc().format('DD-MM-YYYY'));

  const [pageNumber,setPageNumber] = useState(0); 

  const devoPerPage = 40;
  const pagesVisited = pageNumber * devoPerPage;
  // 40 -> 50
  const displayDevo = devoluciones
    .slice(pagesVisited, pagesVisited + devoPerPage)
    .map((item, index) => {
        // console.log(index);
      return (
      <>   
                <tr key={index}>
                    <td>{item.rut_cliente}</td>
                    <td>{item.id_numero_seguimiento  }</td>
                    <td>{item.Factura_boleta}</td>
                    <td>{moment(item.Fecha_recepcion).utc().format('DD-MM-YYYY')}</td>
                    <td>{item.motivo_corto}</td>
                    <td><span title={item.descripcion}>{item.estado}</span></td>
                    <td><ModalDetalleFolio idFolio={item.id_folio} /></td>
                    {/* <td><button type="button" className="btn btn-secondary btn-sm" value='Etiqueta' onClick={()=>(generatePDF(item.id_numero_seguimiento,item.num_seg_padre))}>Etiqueta</button></td> */}
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
      <td colSpan={6}>
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