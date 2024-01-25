import { memo } from 'react';
import { useImpresora } from '../hooks/useImpresora';
import PropTypes from 'prop-types';
import { SnackbarAlert, SnackbarAlertError } from '../ui/components';

//uso el memo para que no renderice los botones cuando el componente padre (tablaPrincipal) cambia el estado actualizando la tabla
export const BotonReanuda = memo(({ printer }) => {

    const { reanuda, isLoading, alert, setAlert } = useImpresora(printer);

    const onReanudar = async () => {
        await reanuda();
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-outline-dark"
                disabled={isLoading}
                onClick={() => onReanudar(printer)}
            >
                <i className="bi bi-play-fill"></i>
            </button>
            {alert === true && <SnackbarAlert accion={"Reanudación"} alert={alert} setAlert={setAlert} />}
            {alert === "error" && <SnackbarAlertError accion={"Reanudación"} alert={alert} setAlert={setAlert} />}
        </>
    )
});

BotonReanuda.displayName = 'BotonActualizar';

BotonReanuda.propTypes = {
    printer: PropTypes.string,
}