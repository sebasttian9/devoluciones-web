import { useState, useEffect, useId } from 'react';

const BuscarCodigo = ({productos, setProductos, setItLoading, rut, setBuscaFactura, setFacturaCompletaUsada}) => {

    // estado del codigo
    const [codigoBuscar,setCodigoBuscar] = useState('');


    const buscarCodigo = async () =>{

        document.getElementById("txtBuscarFactura").value = '';
        let codigo = document.getElementById("txtBuscarCodigo").value;
        if(codigo===''){
            alert('Ingrese Codigo!'); 
            document.getElementById("txtBuscarCodigo").focus();
            return;
        }
            
        setFacturaCompletaUsada(false);
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
        //obtengo la empresa
        // obtengo los datos guardado en localstorage
        const stringifiedPerson = localStorage.getItem('empresa');
        const empresa = JSON.parse(stringifiedPerson);        
        
        const response = await fetch('https://api-devoluciones.azurewebsites.net/api/devoluciones/producto/'+codigoBuscarSinGuion+'/'+rutSinNada+'/'+empresa.empresa);
        const prods = await response.json();
        // console.log(prods);

        let prods2 = [];
        // prods.map(item => {
            for (const item of prods) {

                // valido cada producto si la cantidad fue usada completa
                const response3 = await fetch('https://www.gabtec.cl/valida-dev-ws.php?nota_pedido='+item.nota_pedido+'&num_factura='+item.factura+'&prod_id='+item.prod_id);
                const result = await response3.json();
                
                if(result.length>0){

                        let cantidadDisponible = item.unidad - result[0].cant_usada;

                        if(cantidadDisponible>0){
                            prods2.push({...item, cant_disponible: cantidadDisponible});
                        }
                }else{

                        prods2.push({...item, cant_disponible: item.unidad});

                }
                
                // console.log('validacion -->',cantItemNcredito);
                // console.log(item.factura);
            }
            console.log(prods2);
        // });


        setProductos(prods2);
        setItLoading(false);
    }

    return(

        <div className="col-6">
        <input type='text' className="form-control" onChange={e => (setCodigoBuscar(e.target.value))} id='txtBuscarCodigo' name='txtBuscarCodigo' placeholder='Buscar Codigo interno / Fabrica' />
        <button type='button' onClick={() => {buscarCodigo()}}  className='btn btn-primary btn-sm mt-2 float-start'>Buscar</button>
        </div>
    )

}

export default BuscarCodigo;