
import {useContext, useState} from 'react';
import {Store} from '../store/Store';

const Inicio = () => {

    const [logeado, setLogeado] = useContext(Store); 
    // var navigate = useNavigate();
    // console.log(logeado);


        return (
            <>
                <div className="container mt-4">
                    <h1>Inicio</h1>
                    <h5>Bienvenido {logeado.user.cli_razon_social}</h5>
                </div>
            </>
        )


}

//https://github.com/sebasttian9/devoluciones-web.git

export default Inicio;