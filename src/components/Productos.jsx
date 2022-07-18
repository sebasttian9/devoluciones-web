import React from 'react'
import { useState, useEffect, useId } from 'react';

const Productos = (props) => {

      //Cantidad devolver
      const [cantidadDevolver, setCantidadDevolver] = useState(0);


const formatearProd = (prod_id) =>{


    let cuerpo = '';
    let guion = '';
    cuerpo = prod_id.substring(0,5);
    guion = prod_id.substring(5);
    let prod_id2 = cuerpo+'-'+guion;
    // console.log(cuerpo+'-'+guion);

    return prod_id2;

}

    // function para saber si estan agregando un producto de otra factura a la devolucion
    const existeFactura = (item2) => {
      const buscaProd = props.productosSeleccinados.find(item => item.factura !== item2.factura );
    //   console.log(buscaProd);
      if(buscaProd){
          return buscaProd.factura;
      }else{
          return false;
      }
  }

      // function para saber si existe el producto en los productos seleccionados
      const existeProd = (item2) => {
        const buscaProd = props.productosSeleccinados.find(item => item.prod_id == item2.prod_id);
        if(buscaProd){
            return true;
        }else{
            return false;
        }
    }

const seleccionarProducto = (item,index) => {

    if(existeFactura(item)){
        alert('No puede agregar productos de otra factura');
        return;
    }

    let cantidad = document.getElementById('txtCantDevolver'+index).value;
    if(cantidad==='' || cantidad==='0'){

        alert('Ingrese una Cantidad');
        document.getElementById('txtCantDevolver'+index).focus();
        return;
    }

    if(parseInt(item.unidad)<parseInt(cantidad)){

        alert('La cantidad ingresada no puede superar la cantidad en factura!');
        document.getElementById('txtCantDevolver'+index).focus();
        return;  

    }

    

    if(existeProd(item)){

        console.log('agregando el mismo producto');
        //function para buscar el index del item repetido del carro
        // const encontro = props.productosSeleccinados.find(item2 => item2.prod_id === item.prod_id);
                    //function para buscar el index del item repetido del carro
        // const index = fruits.findIndex(fruit => fruit === "blueberries");
        // const encontro = (item3) => item3.prod_id == item.prod_id;
        // console.log(encontro);

        const indiceItem = props.productosSeleccinados.findIndex(item2 => item2.prod_id === item.prod_id);
        console.log('-->',indiceItem,props.productosSeleccinados[indiceItem]);

        let cantdiadSumar = parseInt(props.productosSeleccinados[indiceItem].cantidad_devolver) + parseInt(cantidad);

        if(cantdiadSumar>props.productosSeleccinados[indiceItem].unidad){

            alert('Ya ingreso la cantidad maxima para este producto! ');
            return;
        }        


        //modifico el atributo cantidad en carro del item repetido a agregar
        props.productosSeleccinados[indiceItem].cantidad_devolver = parseInt(props.productosSeleccinados[indiceItem].cantidad_devolver) + parseInt(cantidad);

        props.setProductosSeleccinados([...props.productosSeleccinados]);

        // console.log('1-->',props.productosSeleccinados);

        // props.setProductosSeleccinados([]);

        // console.log('2-->',props.productosSeleccinados);

    }else{

        // let cantidad = document.getElementById('txtCantDevolver'+index).value;

        console.log(item,cantidad);

        item.cantidad_devolver = cantidad;

        props.setProductosSeleccinados([...props.productosSeleccinados,item]);

        // console.log(item);

      }

    //   console.log('nota y fecha -->',props.productosSeleccinados[0].nota_pedido, props.productosSeleccinados[0].fecha_documento);

}


  return (


    props.productos.length ?  (props.productos.map((item,index) =>(

        <tr key={index}>
            <th scope="row">{formatearProd(item.prod_id)}</th>
            <td>{item.prod_descripcion_venta}</td>
            <td>{item.cant_disponible}</td>        
            <td>{item.factura}</td>
            <td><input className='form-control form-control-sm' defaulvalue={0}  style={{width: "50px", margin:'auto'}} min={0}  type={'number'} id={'txtCantDevolver'+index}></input></td>
            <td>
                <div className='btn-group'>
                <button type="button" className="btn btn-outline-success ml-2" title='Seleccionar' onClick={()=>(seleccionarProducto(item,index))}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                </svg>
                  <span class="visually-hidden">Button</span>
                </button> 
                </div>              
            </td>
        </tr>


    )))
    : (<tr><td colSpan={6}>No hay datos</td></tr>)

    
  )
}

export default Productos