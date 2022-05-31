import {
    BrowserRouter,
    Switch,
    Route,
    NavLink,
    Link
  } from 'react-router-dom';


const Nabvar = () =>{

    return (

            <>
                <nav className="navbar navbar-expand-sm navbar-light" style={{backgroundColor: "#e3f2fd"}} aria-label="Third navbar example">
                    <div className="container-fluid">
                    {/* <a className="navbar-brand" href="#">Devoluciones</a> */}
                    <Link to="/" className="navbar-brand">Devoluciones</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample03">
                        <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                        <li className="nav-item">
                            {/* <a className="nav-link " aria-current="page" href="#">Mi cuenta</a> active  */}
                            <Link to="/cuenta" className="nav-link ">Mi cuenta</Link>
                        </li>
                        <li className="nav-item">
                            {/* <a className="nav-link" href="#">Crear Devolucion</a> */}
                            <Link to="/crearDev" className="nav-link">Crear Devolucion</Link>
                            
                        </li>
                        <li className="nav-item">
                            <Link to={'/MisDevoluciones'} className="nav-link ">Mis devoluciones</Link> {/* disabled */}
                        </li>
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="dropdown03" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
                            <ul className="dropdown-menu" aria-labelledby="dropdown03">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li> */}
                        </ul>
                        {/* <form>
                        <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
                        </form> */}
                    </div>
                    </div>
                </nav>                
            </>

    );


}


export default Nabvar;