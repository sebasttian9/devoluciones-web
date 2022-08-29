import { useState, useEffect, useId, useContext } from 'react';
import {Store} from '../store/Store';
import { useForm } from "react-hook-form";
import Spinner from './SpinnerGuardar';
import { useNavigate  } from "react-router-dom";


const LoginCliente = () => {

    var navigate = useNavigate();
    const [logeado, setLogeado] = useContext(Store);
    const [loading, setLoading] = useState(false);
    const [errorAutenticar, setErrorAutenticar] = useState(false);
    const [textoErrorAutenticar, setTextoErrorAutenticar] = useState('');

    const { register, formState: { errors }, handleSubmit } = useForm();


    const iniciarSession = async(e) => {

        setLoading(true);
        setErrorAutenticar(false);

        // Limpiar rut de puntos y validar el guion
        let rut = e.rutCliente.replace('.','');
        let rut2 = rut.replace('.','');
        console.log('rut sin puntos',rut2);
        console.log('trae guion ->', e.rutCliente.includes('-'));

        if(!e.rutCliente.includes('-')){
            setErrorAutenticar(true);
            setLoading(false);
            setTextoErrorAutenticar('Debe escribir el RUT con guion');
            return;
        }


            // POST request using fetch inside useEffect React hook
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rut_cliente: rut2,
                                       empresa: e.SelectEmpresa  })
            };
            const response = await fetch('https://api-devoluciones.azurewebsites.net/api/devoluciones/autenticarCliente', requestOptions);
            const data =  await response.json();

            console.log(response);
            console.log(data.length);
            
            if(data.length){

                setLoading(false);

                // console.log('cliente logeado', data[0].cli_rut);

                // creo objeto para guardar en localstorage
                const objeto = {
                    'cli_razon_social': data[0].cli_razon_social,
                    'cli_rut': data[0].cli_rut,
                    'cli_empresa' : e.SelectEmpresa,
                    'cli_correo' : data[0].cli_mail,
                    'cli_direccion': data[0].cli_direccion,
                    'cli_comuna' : data[0].cli_comuna
                };

                // guardo objeto en localstorage
                localStorage.setItem('user', JSON.stringify(objeto));

                // obtengo los datos guardado en localstorage
                const stringifiedPerson = localStorage.getItem('user');
                const personAsObjectAgain = JSON.parse(stringifiedPerson);

                setLogeado({
                    user: personAsObjectAgain,
                    estado: true,
                    vinculada:false,
                    folios_vinculados: 0,
                    cant_productos: 0
                });
                navigate('/');

            }else{

                setErrorAutenticar(true);
                setTextoErrorAutenticar('Cliente no existe!');
                setLoading(false);
            }

        
    }


  return (
      
    // <body class="text-center mt-3">
        <div className='container mt-5 mb-5'>
        <main className="form-signin w-100 m-auto mt-5">
        <form onSubmit={handleSubmit(iniciarSession)}>
            <h1 className="h3 mb-3 fw-normal">Iniciar sesion</h1>

            <div className="form-floating">
            <input type="text" class="form-control" {...register("rutCliente", { required: true })} id="floatingInput" placeholder="18211732-1" />
            <label htmlFor="floatingInput">Rut cliente (ej. 189871123-7)</label>
            {errors.rutCliente?.type === 'required' && <span className='error'>Ingrese Rut</span>}
            </div>
            <div className="form-floating">
            <select className="form-select" {...register("SelectEmpresa", { required: true })} aria-label="Default select example">
                <option value=''>(seleccione)</option>
                <option value='1'>AUTOMARCO</option>
                <option value='2'>GABTEC</option>
                <option value='3'>AUTOTEC</option>
                <option value='4'>HD AUTOMARCO</option>
            </select>                
            {errors.SelectEmpresa?.type === 'required' && <span className='error'>Seleccione Empresa</span>}
            
            </div>

            <div className="checkbox mb-3" id='mensaje'>
            </div>
            
            <button className="w-100 btn btn-lg btn-primary" type="submit">Ingresar</button>
            {/* <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p> */}
        </form>
        {loading ? <Spinner mensaje={'Cargando..'}/> : null }
        { errorAutenticar ?  <div className='mt-3'><span className='error'>{textoErrorAutenticar}</span></div> : null }
    </main>
    </div>
    // </body>
    
  )
}

export default LoginCliente