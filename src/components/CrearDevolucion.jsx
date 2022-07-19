import React from 'react'
import { useState, useEffect, useId, useContext, Suspense, lazy } from 'react';
import {Store} from '../store/Store';
import Productos from './Productos';
import Spinner from './Spinner';
import SpinnerGuardar from './SpinnerGuardar';
import '../css/styles.css';
import BuscarCodigo from './BuscarCodigo';
import DetalleFolio from './DetalleFolio';
import { useForm } from "react-hook-form";
import {
    BrowserRouter,
    Switch,
    Route,
    NavLink,
    Link
  } from 'react-router-dom';

const CrearDevolucion = () => {

    // context con usuario y login
    const [logeado, setLogeado] = useContext(Store);

    // Estado del listado de motivos
    const [motivos, setMotivos] = useState([]);

    // listado de productos encontrados
    const [productos, setProductos] = useState([]);
    
    // Loading
    const [isLoading, setItLoading] = useState(false);
    const [isLoadingCabecera, setIsLoadingCabecera] = useState(false);
    
    // Mensaje de error
    const [mensajeError, setMensajeError] = useState("");

    //Hook form
    const { register, formState: { errors }, handleSubmit } = useForm();
    
    //Estados del Formulario
    const [empresa, setEmpresa] = useState(logeado.user.cli_empresa);
    const [motivodev, setMotivoDev] = useState(0);
    const [rut, setRut] = useState(logeado.user.cli_rut);
    const [razonSocial, setRazonSocial] = useState(logeado.user.cli_razon_social);
    const [guiaDespacho, setGuiaDespacho] = useState('');
    const [factura, setFactura] = useState('');
    const [transporte, setTransporte] = useState(0);
    const [solicitud, setSolicitud] = useState(0);
    const [buscaFactura, setBuscaFactura] = useState(false);
    const [selecTodo, setSelecTodo] = useState(true);
    const [facturaCompletaUsada, setFacturaCompletaUsada] = useState(false);

    //cabecera agregada
    const [guardado, setGuardado] = useState(false);

    // id de folio insertado
    const [idFolio, setIdFolio] = useState(0);

    // Busqueda factura y codigo interno
    const [txtFactura, setTxtFactura] = useState('');
    const [txtCodigo, setCodigo] = useState('');

    // Array de productos seleccionados para devolucion
    const [productosSeleccinados, setProductosSeleccinados] = useState([]);


    
    

    const obtenerMotivosDev = async() =>{


            const url = "https://api-devoluciones.azurewebsites.net/api/devoluciones/motivosdevolucion";
            const resp = await fetch(url);
            const data = await resp.json();
            console.log(motivos);
         setTimeout(() => {
            setMotivos(data);
         }, 10000);  
            

    }


    useEffect(() => {

        
        obtenerMotivosDev();

        // return () => {
        //     cleanup
        // };
    }, []);




    //Enviar formulario
    const enviarForm = async (e) => {

        //se previene el refresh
        // e.preventDefault();
        setIsLoadingCabecera(true);
        // console.log('Ingreso');
        // console.log(e);

            // POST request using fetch inside useEffect React hook
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ SelectEmpresa: e.SelectEmpresa,
                                       SelectMotivo: e.SelectMotivo,
                                       SelectTransporte: e.SelectTransporte,
                                       txtFactura: '',
                                       txtGuia: e.txtGuia,
                                       txtRazonSocial: e.txtRazonSocial,
                                       txtRut: e.txtRut,
                                       txtFecha: fechaActual(),
                                       SelectSolicitud: e.SelectSolicitud,
                                       txtObservacion: e.txtObservacion  })
            };
            const response = await fetch('https://api-devoluciones.azurewebsites.net/api/devoluciones/save', requestOptions);
            const data =  await response.json();

            // console.log(response);
            // console.log(data);
            console.log(data[0]);
            console.log(typeof(data[0]));
            
            if(typeof data[0] ==='number'){

                // creo objeto para guardar en localstorage
                const objeto = {
                    'empresa': e.SelectEmpresa
                };

                // guardo objeto en localstorage
                localStorage.setItem('empresa', JSON.stringify(objeto));
                
                setIsLoadingCabecera(false);
                setGuardado(true);
                setIdFolio(data[0]);

            }

            
            // reseteo de variables
            setEmpresa(0);
            setMotivoDev(0);
            setGuiaDespacho('');
            setFactura('');
            setTransporte(0);
            setSolicitud(0);

        // console.log(year+'-'+mes+'-'+day);
        // console.log(fechaActual());

        // INSERT INTO `dev_tbl_folio`(`id_num_folio`, `empresa_id`, `Guia_despacho_factura`, `Factura_boleta`, `Motivo_devolucion`, `estado_folio`, `Fecha_recepcion`, `rut_cliente`, `razon_social`, `transporte`) VALUES (999,1,'123','321',14,0,'2022-04-12','18.211.738-2','Sebastian',2)
        //validaciones 
        // if(empresa==='0'){
        //     alert('Seleccione Empresa');
        //     return;
        // }



    }


    const fechaActual = () => {


        const date = new Date();
        const year = date.getFullYear();
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();

        console.log(date);

        if (month.length < 2) 
        month = '0' + month;
        if (day.length < 2) 
        day = '0' + day;

        return [year, month, day].join('-');

    }

        const buscarPorFactura = async() =>{
            
            document.getElementById("txtBuscarCodigo").value = '';
            let factura = document.getElementById("txtBuscarFactura").value;
            if(factura===''){
                alert('Ingrese Factura!'); 
                document.getElementById("txtBuscarFactura").focus();
                return;
            }

            setItLoading(true);            
            // console.log('Buscar por Factura');
            let rutSinNada = rut.replace('.','');
            rutSinNada = rutSinNada.replace('.','');
            rutSinNada = rutSinNada.replace('-','');
            // console.log(rutSinNada);
            //obtengo la empresa
            // obtengo los datos guardado en localstorage
            const stringifiedPerson = localStorage.getItem('empresa');
            const empresa = JSON.parse(stringifiedPerson);
            console.log(empresa);               
            
            //Obtengo todos los item de la factura
            const response = await fetch('https://api-devoluciones.azurewebsites.net/api/devoluciones/factura/'+txtFactura+'/'+rutSinNada+'/'+empresa.empresa);
            const prods = await response.json();
            console.log('resultado fac -->',prods);

            if(prods.length>0){
                // Validar cantidad de item por factura y nota de pedido en las ventas
                const response2 = await fetch('https://api-devoluciones.azurewebsites.net/api/devoluciones/sumaItems/'+prods[0].factura+'/'+prods[0].nota_pedido);
                const cantItemVentas = await response2.json();
                
                // Validar cantidad de item por factura y nota de pedido en las notas de credito
                const response3 = await fetch('https://www.gabtec.cl/valida-total-dev-ws.php?nota_pedido='+prods[0].nota_pedido+'&num_factura='+prods[0].factura);
                const cantItemNcredito = await response3.json();            
                console.log(cantItemNcredito, cantItemVentas[0].suma);
                
                if(cantItemNcredito===cantItemVentas[0].suma){

                    setFacturaCompletaUsada(true);
                    setProductos([]);

                }else{

                    if(cantItemNcredito>0){

                        // recorrer los productos y crear el campo cantidad_disponible
                        let prods2 = [];
                        // prods.map(item => {
                        for (const item of prods) {
            
                            // valido cada producto si la cantidad fue usada completa
                            const response3 = await fetch('https://www.gabtec.cl/valida-dev-ws.php?nota_pedido='+item.nota_pedido+'&num_factura='+item.factura+'&prod_id='+item.prod_id);
                            const cantItemNcredito = await response3.json();
                            console.log(cantItemNcredito);
                            
                            let cantidadDisponible = item.unidad - cantItemNcredito[0].cant_usada;
            
                            if(cantidadDisponible>0){
                                prods2.push({...item, cant_disponible: cantidadDisponible});
                            }
                            
                            // console.log('validacion -->',cantItemNcredito);
                            // console.log(item.factura);
                        }                    

                        setProductos(prods2);
                    }else{

                        // recorrer los productos y crear el campo cantidad_disponible
                        let prods2 = [];
                        // prods.map(item => {
                        for (const item of prods) {
            
                            
                                prods2.push({...item, cant_disponible: item.unidad});
                            
                            
                            // console.log('validacion -->',cantItemNcredito);
                            // console.log(item.factura);
                        }                    

                        setProductos(prods2); 
                        console.log(prods2);                           

                    }
                }
            }else{
                setProductos(prods);
            }
            
            setItLoading(false);

        //  Optional code to simulate delay
        //  setTimeout(() => {
        //     setProductos(prods);
        //     setItLoading(false);
        //  }, 10000);            
            setBuscaFactura(true);
        }


        const seleccionarTodo = () => {

            if(selecTodo){
                setSelecTodo(false);
            }else{
                setSelecTodo(true);
            }
            
            if(selecTodo){
               
                let productoArreglo = [];
               
                productos.map(prod =>{

                    prod.cantidad_devolver = prod.unidad;
                    productoArreglo.push(prod);

                });
            //    console.log(productoArreglo);
                setProductosSeleccinados(productos);
            }else{
                setProductosSeleccinados([]);
            }

        }


        // const renderProductos = ();

  return (
    

        <div className='container mt-4'>

            {
                isLoadingCabecera ? <div className='row mt-5'><SpinnerGuardar mensaje={'Guardando cabecera..'}/></div> :
                guardado 
                
                ? (<div>

                    <h3>Agregar productos - Folio {idFolio} </h3>
                    {/* <button className="btn btn-success" type='submit' value="Ingresar detalle"></button> */}

                    <form>
                        <div className="row mt-5">
                            <div className="col-6">
                                <input type='text' className="form-control" onChange={e=>(setTxtFactura(e.target.value))} id='txtBuscarFactura' name='txtBuscarFactura' placeholder='Buscar Factura' />
                                <button type='button' onClick={() => {buscarPorFactura()}} className='btn btn-primary btn-sm mt-2 float-start'>Buscar</button>
                            </div>
                            <BuscarCodigo productos={productos} setBuscaFactura={setBuscaFactura} rut={rut} setItLoading={setItLoading} setProductos={setProductos} setFacturaCompletaUsada={setFacturaCompletaUsada}/>
                        </div>
                    </form>

                    {
                        facturaCompletaUsada ? (<div class="alert alert-danger my-2" role="alert">Esta factura completa ya fue ocupada para devolucion!</div>) : null
                    }
                    
                    <div className="col-12 mt-5" style={{border:'1px solid #adb5bd',padding: '1rem',borderRadius: '6px'}}>
                        <span className='float-start mb-4'>Resultados de busqueda</span>
                        {
                            buscaFactura ? (<div className='float-end'>Seleccionar todo 
                                                {selecTodo ? (<button type="button" class="btn ml-1" onClick={() => (seleccionarTodo())} ><svg className='mb-2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-square" viewBox="0 0 16 16">
                                                              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                                              </svg></button>) 
                                                : (<button type="button" class="btn ml-1" onClick={() => (seleccionarTodo())} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
                                                    <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
                                                    <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                                                    </svg></button>)}</div>) 
                            : null
                        }


                    <table className="table ">
                    <thead>
                        <tr>
                        
                        <th scope="col">Codigo</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Cantidad disponible</th>
                        <th scope="col">Factura</th>
                        <th scope="col">Cant. devolver</th>                            
                        <th scope="col">Seleccionar</th>
                        </tr>
                    </thead>
                    <tbody>
                        { isLoading ? <Spinner mensaje={'Cargando datos...'}/> : <Productos setBuscaFactura={setBuscaFactura} productos={productos} productosSeleccinados={productosSeleccinados} setProductosSeleccinados={setProductosSeleccinados} /> }
                    </tbody>
                    </table> 
                    </div>       
                    
                    {
                        productosSeleccinados.length ? (<DetalleFolio  idFolio={idFolio} productosSeleccionados={productosSeleccinados} setProductosSeleccinados={setProductosSeleccinados}/>) : null
                    }
                    
                    </div>) 
                
                : (<div>
                    
                    <h1>Crear Devolucion</h1>

                    <form onSubmit={handleSubmit(enviarForm)}>
                    <div className="row">
                        <div className='col-6 mt-3'>
                            <label htmlFor="selectEmpresa" className="form-label float-start">Empresa</label>                
                            <select className="form-select form-select-md" defaultValue={empresa} {...register("SelectEmpresa", { required: true })}  onChange={e => (setEmpresa(e.target.value))} id="selectEmpresa" aria-label=".form-select-sm example">
                                <option value=''>(seleccione)</option>
                                <option value='1'>AUTOMARCO</option>
                                <option value='2'>GABTEC</option>
                                <option value='3'>AUTOTEC</option>
                                <option value='4'>HD AUTOMARCO</option>                               
                            </select>
                            {errors.SelectEmpresa?.type === 'required' && <span className='error'>Seleccione Empresa</span>}              
                        </div>
                        <div className='col-6 mt-3'>
                            <label htmlFor="selectMotivo" className="form-label float-start">Motivo devolucion</label>
                            <select  defaultValue={motivodev} onChange={e => (setMotivoDev(e.target.value))} {...register("SelectMotivo", { required: true })} id="selectMotivo" className="form-select form-select-md" aria-label=".form-select-sm example">
                                <option value="">{ motivos.length ? '(seleccione)' : 'Cargando motivos..'  }</option>
                                {
                                    motivos.map((item,index) =>(
                                        
            
                                        <option key={index} value={item.id_motivo}>{item.motivo_dev}</option>
            
                                    ))
                                }
                                
                            </select>
                            {errors.SelectMotivo?.type === 'required' && <span className='error'>Seleccione Motivo</span>}                
                        </div>
                        <div className='col-4 mt-3'>
                                <label htmlFor="txtRut" className="form-label float-start">Rut</label>
                                <input type="text" value={rut} {...register("txtRut", { required: true })} onChange={e=>(setRut(e.target.value))} className="form-control" readOnly  id="txtRut" placeholder="Llenado automatico" />
                        </div>
                        <div className='col-4 mt-3'>
                                <label htmlFor="txtRazonSocial" className="form-label float-start">Razon social</label>
                                <input type="text" className="form-control" {...register("txtRazonSocial", { required: true })} value={razonSocial} onChange={e=>(setRazonSocial(e.target.value))}  readOnly id="txtRazonSocial" placeholder="Llenado automatico" />
                        </div>    
                        <div className='col-4 mt-3'>
                                <label htmlFor="txtGuiaDespacho" className="form-label float-start">Guia despacho de envio</label>
                                <input type="text" {...register("txtGuia", { required: false })} className="form-control" value={guiaDespacho} onChange={e=>(setGuiaDespacho(e.target.value))} id="txtGuiaDespacho" placeholder="" />
                                {errors.txtGuia?.type === 'required' && <span className='error'>Guia despacho es requerida</span>}
                        </div>
                        {/* <div className='col-4 mt-3'>
                                <label htmlFor="txtFactura" className="form-label float-start">Factura</label>
                                <input type="text" className="form-control" {...register("txtFactura", { required: true })} value={factura} onChange={e=>(setFactura(e.target.value))} id="txtFactura" placeholder="" />
                                {errors.txtFactura?.type === 'required' && <span className='error'>Factura es requerida</span>}
                        </div> */}
                        <div className='col-4 mt-3'>
                            <label htmlFor="selectTransporte" className="form-label float-start">Transporte a bodega</label>                
                            <select className="form-select form-select-md" defaultValue={transporte} {...register("SelectTransporte", { required: true })}  onChange={e=>(setTransporte(e.target.value))} id="selectTransporte" aria-label=".form-select-sm example">
                                <option value=''>(seleccione)</option>
                                {/* <option value="1">EXTERNO</option>
                                <option value="2">INTERNO</option> */}
                                <option value="3">VENDEDOR</option>
                                <option value="4">CLIENTE</option>
                            </select>
                            {errors.SelectTransporte?.type === 'required' && <span className='error'>Seleccione transporte</span>}                
                        </div>  
                        <div className='col-4 mt-3'>
                            <label htmlFor="selectSolicitud" className="form-label float-start">Solicitud cliente</label>                
                            <select className="form-select form-select-md" defaultValue={0} {...register("SelectSolicitud", { required: true })}  id="selectSolicitud" aria-label=".form-select-sm example">
                                                <option value=''>(seleccione)</option>
                                                <option value='3'>N. Credito</option>
                                                <option value='2'>Cambio</option>
                                                <option value='4'>Reposicion</option>
                                                <option value='1'>Reparacion</option>

                            </select>
                            {errors.SelectSolicitud?.type === 'required' && <span className='error'>Seleccione solicitud</span>}                
                        </div>
                        <div className='col-12 mt-3'>
                                <label htmlFor="txtObservacion" className="form-label float-start">Observacion</label>
                                <input type="text" {...register("txtObservacion", { required: false })} maxLength={120}  className="form-control" placeholder='(Máximo 120 caracteres )'  id="txtObservacion" />
                        </div>                                                                                                      
                    </div>
                    <div className="col-12 mt-5">
                        <button className="btn btn-success" type='submit' value="continuar">Guardar y Continuar</button>
                    </div>
                    
                    </form>
                
                </div>)
            }
                
            </div>
               
    
  )
}

export default CrearDevolucion