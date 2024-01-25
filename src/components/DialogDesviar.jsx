import { Modal } from "bootstrap";
import { memo, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useImpresora } from '../hooks/useImpresora';
import { Spinner } from "../ui/components";
import { impresorasTodas } from "../consts/consts";

export const DialogDesviar = memo(({ data, printer, onClose, isOpen, setAbrirSnack }) => {

    //Si existe la prop(cuando llega) coge los dos primeros caracteres para saber de que almacen es la imperesora que se quiere desviar.
    const almImp = data?.impresora?.substring(0, 2) || '';

    const [impresoraDestino, setImpresoraDestino] = useState(null);
    const { desviar, isLoading, alert } = useImpresora(printer, impresoraDestino);

    const onDesviar = async (impresoraDestino) => {

        setImpresoraDestino(impresoraDestino);

        try {
            await desviar(impresoraDestino);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setAbrirSnack(alert);
        if (alert) onClose();
    }, [alert]);

    useEffect(() => {

        // Inicializar el modal solo cuando el componente se monta
        const myModal = new Modal('#dialogDesviar', {
            keyboard: false
        });

        // Mostrar el modal al abrir
        if (isOpen) {
            myModal.show();
        }

        return () => {
            // Limpiar el modal al desmontar el componente
            myModal.dispose();
        };
    }, [isOpen]);

    return (

        <div className="modal fade" style={{ zIndex: 9050 }} id="dialogDesviar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Desviar impresora {printer} </h1>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                            data.desviada ?
                                <div style={{ margin: '8px 0' }}>
                                    {/*Si la impresora está desviada no hacemos nada*/}
                                    <p>LA IMPRESORA ESTÁ DESVIADA, PRIMERO HAY QUE DEVOLVERLA A SU SITIO ORIGINAL</p>
                                </div>
                                :
                                // Mostrar botones para impresoras del mismo almacén
                                impresorasTodas
                                    .filter((impresora) =>
                                        impresora.impresora.startsWith(almImp)
                                    )
                                    .map((impresora) => (
                                        // Excluir el botón con el mismo nombre que estado.impresora
                                        data.impresora !== impresora.impresora && (
                                            <button
                                                type="button"
                                                className="btn btn-outline-info mt-2 btn-sm"
                                                key={impresora.impresora}
                                                onClick={() => onDesviar(impresora.impresora)}
                                                id={impresora.impresora}
                                                title="Selecciona impresora desvío"
                                            >
                                                {impresora.impresora}
                                            </button>
                                        )
                                    ))
                        }
                        {isLoading ? <Spinner loading={isLoading} /> : null}
                    </div>
                    <div className="modal-footer d-flex ">
                        <button type="button" className="btn btn-outline-danger" onClick={onClose}>
                            <i className="bi bi-x-circle"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
});

DialogDesviar.displayName = 'DialogEstado';

DialogDesviar.propTypes = {
    printer: PropTypes.string,
    onClose: PropTypes.func,
    setAbrirSnack: PropTypes.func,
    setEstaOk: PropTypes.func,
    setIsOpen: PropTypes.func,
    isOpen: PropTypes.bool,
    data: PropTypes.object,
}