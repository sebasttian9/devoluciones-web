import { useState, useEffect, useId } from 'react';

const BuscarCodigo = ({productos, setProductos, setItLoading, rut, setBuscaFactura}) => {

    // estado del codigo
    const [codigoBuscar,setCodigoBuscar] = useState('');


    const buscarCodigo = async () =>{


        let codigo = document.getElementById("txtBuscarCodigo").value;
        if(codigo===''){
            alert('Ingrese Codigo!'); 
            document.getElementById("txtBuscarCodigo").focus();
            return;
        }
            
        setItLoading(true);
        setBuscaFactura(false);
        console.log('Buscar por Factura');
        //Limpiar rut
        let rutSinNada = rut.replace('.','');
        rutSinNada = rutSinNada.replace('.','');
        rutSinNada = rutSinNada.replace('-','');
        // console.log(rutSinNada);

        // Limpiar codigo 
        let codigoBuscarSinGuion = codigoBuscar.replace('-','');
        
        const response = await fetch('https://api-devoluciones.azurewebsites.net/api/devoluciones/producto/'+codigoBuscarSinGuion+'/'+rutSinNada);
        const prods = await response.json();
        console.log(prods);
        setProductos(prods);
        setItLoading(false);
    }

    return(

        <div className="col-6">
        <input type='text' className="form-control" onChange={e => (setCodigoBuscar(e.target.value))} id='txtBuscarCodigo' name='txtBuscarCodigo' placeholder='Buscar Codigo interno / Fabrica' />
        <button type='button' onClick={() => {buscarCodigo()}}  className='btn btn-primary btn-sm mt-3 float-start'>Buscar</button>
        </div>
    )

}

export default BuscarCodigo;