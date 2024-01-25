import { DialogDesviar } from './';
import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { useImpresora } from '../hooks/useImpresora';
import { SnackbarAlert, SnackbarAlertError, Spinner } from '../ui/components';

//uso el memo para que no renderice los botones cuando el componente padre (tablaPrincipal) cambia el estado actualizando la tabla
export const BotonDesviar = memo(({ printer }) => {

    const { estado, isLoading, data } = useImpresora(printer);
    const [isOpen, setIsOpen] = useState(false);
    const [abrirSnack, setAbrirSnack] = useState(false);

    const onCheckDesvio = async () => {
        await estado();
        setIsOpen(true);
    }

    const closeDialog = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-outline-info"
                onClick={() => onCheckDesvio(printer)}
                title='Pulsa para seleccionar impresora destino y desviar'
            >
                <i className="bi bi-sign-turn-left-fill"></i>
            </button>
            {isLoading ? <Spinner loading={isLoading} /> : null}
            {isOpen && (
                <DialogDesviar onClose={closeDialog} isOpen={isOpen} printer={printer} data={data} setAbrirSnack={setAbrirSnack} />
            )}
            {abrirSnack === true && <SnackbarAlert accion={"Desviada de manera"} alert={abrirSnack} setAlert={setAbrirSnack} />}
            {abrirSnack === "error" && <SnackbarAlertError accion={"Restablecida de manera"} alert={abrirSnack} setAlert={setAbrirSnack} />}

        </>
    )
});

BotonDesviar.displayName = 'BotonActualizar';

BotonDesviar.propTypes = {
    printer: PropTypes.string,
}