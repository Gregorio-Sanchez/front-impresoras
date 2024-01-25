import { useState, memo } from 'react';
import { useImpresora } from '../hooks/useImpresora';
import { DialogEstado } from './';
import { SnackbarAlert, SnackbarAlertError, Spinner } from '../ui/components';
import PropTypes from 'prop-types';

//uso el memo para que no renderice los botones cuando el componente padre (tablaPrincipal) cambia el estado actualizando la tabla
export const BotonEstado = memo(({ printer }) => {

    const { estado, isLoading, data } = useImpresora(printer);
    const [abrirSnack, setAbrirSnack] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    const onEstado = async () => {
        await estado();
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button
                type="button"
                disabled={isLoading}
                className="btn btn-outline-warning"
                onClick={() => onEstado(printer)}
                title='Consultar estado'
            >
                <i className="bi bi-question-circle-fill"></i>
            </button>
            {isLoading ? <Spinner loading={isLoading} /> : null}
            {isOpen && (
                <DialogEstado onClose={closeDialog} isOpen={isOpen} setIsOpen={setIsOpen} printer={printer} data={data} setAbrirSnack={setAbrirSnack} />
            )}
            {abrirSnack === true && <SnackbarAlert accion={"Restablecida de manera"} alert={abrirSnack} setAlert={setAbrirSnack} />}
            {abrirSnack === "error" && <SnackbarAlertError accion={"Restablecida de manera"} alert={abrirSnack} setAlert={setAbrirSnack} />}
        </>
    )
});

BotonEstado.displayName = 'BotonActualizar';

BotonEstado.propTypes = {
    printer: PropTypes.string,
}