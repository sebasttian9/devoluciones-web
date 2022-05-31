

import ModalGuardarFolio from "./ModalGuardarFolio";

const DetalleFolio = ({productosSeleccionados, setProductosSeleccinados,idFolio}) =>{

        const formatearProd = (prod_id) =>{


                let cuerpo = '';
                let guion = '';
                cuerpo = prod_id.substring(0,5);
                guion = prod_id.substring(5);
                let prod_id2 = cuerpo+'-'+guion;
                // console.log(cuerpo+'-'+guion);
            
                return prod_id2;
            
            }


        const eliminarProd = (item, index) => {

            console.log(item);
            console.log('antes de eliminar -->', productosSeleccionados);

            //elimino el item del array 
            productosSeleccionados.splice(index,1);

            
            console.log('despues de eliminar -->', productosSeleccionados);
            // seteo la cantidad (le resto la cantidad eliminada del item) y recupero el carro nuevamente
            setProductosSeleccinados([...productosSeleccionados]);

        }




    return (

            <div className="mt-5 mb-5">
                    <h3>Productos seleccionados</h3>
                    <div className="col-12 mt-5 mb-5" style={{border:'1px solid #adb5bd',padding: '1rem',borderRadius: '6px'}}>
                        {/* <span className='float-start mb-4'>Resultados de busqueda</span> */}
                    <table className="table ">
                    <thead>

                        <tr>
                        
                        <th scope="col">Codigo</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Factura</th>                            
                        <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                                    productosSeleccionados.length ? ((productosSeleccionados.map((item,index) =>(

                                        <tr key={index}>
                                            <th scope="row">{formatearProd(item.prod_id)}</th>
                                            <td>{item.prod_descripcion_venta}</td>
                                            <td>{item.cantidad_devolver}</td>        
                                            <td>{item.factura}</td>
                                            <td>
                                                <div className='btn-group'>
                                                <button type="button" className="btn btn-outline-danger ml-2" title='Eliminar' onClick={()=>(eliminarProd(item,index))}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                </svg>
                                                  <span class="visually-hidden">Button</span>
                                                </button> 
                                                </div>              
                                            </td>
                                        </tr>
                                
                                
                                    )))) 
                                       :                                     
                                    (<tr><td colSpan={6}>No hay productos seleccionados</td></tr>)
                        }
                        
                    </tbody>
                    </table> 
                    </div>       

                    <div className="row mt-3">
                        <div className="col-12">

                            <ModalGuardarFolio formatearProd={formatearProd} idFolio={idFolio}  productosSeleccionados={productosSeleccionados}/>
                            {/* {
                                productosSeleccionados.length ? 
                                
                                (<input type={'button'} className="btn btn-success"   onClick={()=>(enviarDetalleFolio())} value={'Guardar folio'}></input>) 
                                
                                : 
                                
                                (<input type={'button'} className="btn btn-success" disabled   onClick={()=>(enviarDetalleFolio())} value={'Guardar folio'}></input>)
                            } */}
                            
                        </div>
                    </div>
                    </div>                    
            

    )



}


export default DetalleFolio;