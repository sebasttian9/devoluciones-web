import {Store} from '../store/Store';
import { useContext, useEffect } from 'react';
import { useNavigate  } from "react-router-dom";

const CerrarSesion = () => {

    var navigate = useNavigate();
    const [logeado, setLogeado] = useContext(Store);

    const cerrarSession = () => {

        // se elimina del localstorage el user
        localStorage.removeItem('user');

        // se elimina del context
        setLogeado({
            user: {},
            estado: false
        });


        navigate('/');
    }


    useEffect(() => {
        
        cerrarSession();

    }, []);


  return (
    <div>CerrarSesion</div>
  )
}

export default CerrarSesion