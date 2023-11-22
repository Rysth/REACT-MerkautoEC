import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';

/* eslint-disable */
function Accordion({ codigo, index, expandedIndex, toggle, date, order }) {
  const isExpanded = index === expandedIndex;

  return (
    <div className="p-4 bg-blue-700 border rounded-md md:hover:shadow-xl md:transition">
      <header
        className="flex items-center justify-between font-semibold text-white cursor-pointer"
        onClick={() => toggle(index)}
      >
        <h3 className="text-base font-bold sm:text-lg md:text-xl hover:select-auto selection:bg-white selection:text-black">{`${
          index + 1
        }) Orden - Vehículo ${order.vehiculo.placa}`}</h3>
        <h4 className="text-sm">{`Fecha ${date}`}</h4>
      </header>
      <Collapse isOpened={isExpanded}>
        <article class="bg-white p-3 mt-3 rounded-md">
          <header className="flex items-center justify-between mb-3 text-center sm:text-left">
            <h5 className="text-base font-bold ">Datos Relevantes</h5>
            <h5 className="text-xl font-black ">{codigo}</h5>
          </header>
          <div className="grid grid-cols-2 mt-3 sm:grid-cols-4 min-w-[500px] sm:w-full gap-2">
            <p className="text-sm">
              <span className="font-semibold">Cédula:</span>{' '}
              {order.cliente.cedula}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Nombre:</span>{' '}
              {order.cliente.nombre}
            </p>
            <a
              className="text-sm underline"
              href={`tel:+${order.cliente.celular}`}
            >
              <span className="font-semibold ">Celular:</span>{' '}
              {order.cliente.celular}
            </a>
            <p className="text-sm">
              <span className="font-semibold">Técnico:</span>{' '}
              {order.cliente.tecnico}
            </p>
          </div>
          <div className="grid grid-cols-2 mt-3 sm:grid-cols-4 min-w-[500px] sm:w-full gap-2">
            <p className="text-sm">
              <span className="font-semibold">Dirección:</span>{' '}
              {order.cliente.direccion}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Clave:</span>{' '}
              {order.vehiculo.clave ? order.vehiculo.clave : '----'}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Kilometraje:</span>{' '}
              {order.vehiculo.kilometraje ? order.vehiculo.kilometraje : '----'}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Motor:</span>{' '}
              {order.vehiculo.motor ? order.vehiculo.motor : '----'}
            </p>
          </div>
        </article>
      </Collapse>
    </div>
  );
}

Accordion.propTypes = {
  index: PropTypes.number.isRequired,
  expandedIndex: PropTypes.number,
  toggle: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Accordion;
