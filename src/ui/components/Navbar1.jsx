import { Link, NavLink } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web'
import { useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export const Navbar = () => {

    const { keycloak } = useKeycloak()

    useState(() => {
        if (keycloak?.authenticated) return;
        keycloak?.login();
    }, [keycloak]);

    const onLogOut = () => {
        keycloak.logout()
    }

    return (

        <nav className="navbar navbar-expand-lg bg-body-tertiary rounded-3">
            <div className="container-fluid">

                <Link className="navbar-brand" to="/">SAPSPRINT2</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        {/* <NavLink className="nav-link" to="/albacete">Albacete</NavLink>
                        <NavLink className="nav-link" to="/alicante">Alicante</NavLink>
                        <NavLink className="nav-link" to="/almeria">Almeria</NavLink>
                        <NavLink className="nav-link" to="/barcelona">Barcelona</NavLink>
                        <NavLink className="nav-link" to="/cartagena">Cartagena</NavLink>
                        <NavLink className="nav-link" to="/gerona">Gerona</NavLink>
                        <NavLink className="nav-link" to="/granada">Granada</NavLink>
                        <NavLink className="nav-link" to="/madrid">Madrid</NavLink>
                        <NavLink className="nav-link" to="/malaga">Malaga</NavLink>                       
                        <NavLink className="nav-link" to="/melilla">Melilla</NavLink>
                        <NavLink className="nav-link" to="/santomera">Santomera</NavLink>
                        <NavLink className="nav-link" to="/tortosa">Tortosa</NavLink>
                        <NavLink className="nav-link" to="/token">Token</NavLink> */}

                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Almacén
                            </NavLink>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/albacete">Albacete</Link></li>
                                <li><Link className="dropdown-item" to="/alicante">Alicante</Link></li>
                                <li><Link className="dropdown-item" to="/almeria">Almeria</Link></li>
                                <li><Link className="dropdown-item" to="/barcelona">Barcelona</Link></li>
                                <li><Link className="dropdown-item" to="/cartagena">Cartagena</Link></li>
                                <li><Link className="dropdown-item" to="/gerona">Gerona</Link></li>
                                <li><Link className="dropdown-item" to="/granada">Granada</Link></li>
                                <li><Link className="dropdown-item" to="/madrid">Madrid</Link></li>
                                <li><Link className="dropdown-item" to="/malaga">Malaga</Link></li>
                                <li><Link className="dropdown-item" to="/melilla">Melilla</Link></li>
                                <li><Link className="dropdown-item" to="/santomera">Santomera</Link></li>
                                <li><Link className="dropdown-item" to="/tortosa">Tortosa</Link></li>
                                <li><Link className="dropdown-item" to="/token">Token</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                            </ul>
                        </li>
                    </ul>

                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>

                    <button onClick={onLogOut} title='Salir' className="btn btn-outline-primary ms-2" >
                        <i className="bi bi-box-arrow-right"></i>
                    </button>

                </div>
            </div>
        </nav >
    )
}