import { useState } from "react";
import { BusquedaContext } from "./context";
import PropTypes from 'prop-types';

export const BusquedaProvider = ({ children }) => {

    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [ busqueda, setBusqueda ] = useState(false);
    const [abrirSnack, setAbrirSnack] = useState(false)

    return (
        
        <BusquedaContext.Provider value={{ terminoBusqueda, setTerminoBusqueda, busqueda, setBusqueda, abrirSnack, setAbrirSnack }}>
            {children}
        </BusquedaContext.Provider>
    )
}

BusquedaProvider.propTypes = {
    children: PropTypes.object,
}