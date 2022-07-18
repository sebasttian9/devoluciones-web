import React from 'react'
import {Store} from '../store/Store';
import { useContext } from 'react';

const Cuenta = () => {




    const [logeado, setLogeado] = useContext(Store);

  return (
    <>
        <div className="container mt-4">
            <h1>Mi cuenta </h1>
            <div className='row'>
                <div className='col-6 mt-5'>
                    <label htmlFor="exampleFormControlInput1" className="form-label float-start">Correo</label>
                    <input type="email" className="form-control" readOnly id="exampleFormControlInput1" value={logeado.user.cli_correo} placeholder="name@example.com" />
                </div>
                <div className='col-6 mt-5'>
                    <label htmlFor="exampleFormControlInput1" className="form-label float-start">Rut</label>
                    <input type="email" className="form-control" readOnly id="exampleFormControlInput1" value={logeado.user.cli_rut} placeholder="" />
                </div>
                <div className='col-6 mt-5'>
                    <label htmlFor="exampleFormControlInput1" className="form-label float-start">Direccion</label>
                    <input type="email" className="form-control" readOnly id="exampleFormControlInput1" value={logeado.user.cli_direccion} placeholder="name@example.com" />
                </div>
                <div className='col-6 mt-5'>
                    <label htmlFor="exampleFormControlInput1" className="form-label float-start">Comuna</label>
                    <input type="email" className="form-control" readOnly id="exampleFormControlInput1" value={logeado.user.cli_comuna} placeholder="" />
                </div>                  
                <div className='col-12 mt-5'>
                    <label htmlFor="exampleFormControlInput1" className="form-label float-start">Razon Social</label>
                    <input type="email" className="form-control" readOnly id="exampleFormControlInput1" value={logeado.user.cli_razon_social} placeholder="" />
                </div>                              
            </div>
        </div>
    </>
  )
}

export default Cuenta