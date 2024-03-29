import React, { useCallback, useEffect, useState } from 'react';
import { BotonActualizar, BotonEstado, BotonPausa, BotonReanuda, BotonDesviar } from '.';

//Funcion para crear las futuras filas (rows)
function createData(nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto) {
  return { nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto };
}

//Llamada a la funcion que genera las filas pasándole datos de relleno iniciales
const impresorasAlicante = [
  createData('06ADCOM01', 0, 'RG06','172.30.60.247'),
  createData('06ALAV101', 0, 'RG06','172.30.60.245','I065'),
  createData('06ALAV102', 0, 'RG06','172.30.60.249','I066'),
  createData('06ALDEV01', 0, 'RG06','172.30.60.246','I062'),
  createData('06ALDEV02', 0, 'RG06','172.30.60.239'),
  createData('06ALEXP01', 0, 'RG06','172.30.60.101','I06M'),
  createData('06ALJEF01', 0, 'RG06','172.30.60.241','I06J'),
  createData('06ATTOM01', 0, 'RG06','172.30.60.248','I064'),
]

export const TablaAlicante = React.memo(() => {

  const [, setValor] = useState({});

  const recibirDatosActualizados = useCallback((data) => {

    impresorasAlicante.find(printer => {
      //Si la impresora coincide y los datos son distintos de los que ya teníamos entonces tralarí 
      if (data?.impresora === printer.nameImpresora) {
        printer.numTrabajos = data.valor
      }
      setValor(() => data)
    });
  }, []);

  useEffect(() => {
    recibirDatosActualizados();
  }, [recibirDatosActualizados]);

  return (

    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Impresora</th>
          <th scope="col">Trabajos</th>
          <th scope="col">Actualizar</th>
          <th scope="col">Pausar</th>
          <th scope="col">Reanudar</th>
          <th scope="col">Estado</th>
          <th scope="col">Desviar</th>
        </tr>
      </thead>
      <tbody>
        {
          impresorasAlicante.map((impresora) => (
            <tr key={impresora.nameImpresora}>
              <td>{impresora.nameImpresora}</td>
              <td>{impresora.numTrabajos}</td>
              <td>{<BotonActualizar printer={impresora.nameImpresora} recibirDatos={recibirDatosActualizados} />}</td>
              <td>{<BotonPausa printer={impresora.nameImpresora} />}</td>
              <td>{<BotonReanuda printer={impresora.nameImpresora} />}</td>
              <td>{<BotonEstado printer={impresora.nameImpresora} />}</td>
              <td>{<BotonDesviar printer={impresora.nameImpresora} />}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
});

TablaAlicante.displayName = 'TablaAlicante';