import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Forms/Input/Input';
import Accordion from '../../components/Accordion/Accordion';
import { vehicleDataActions } from '../../redux/slices/vehicleDataSlice';

function Vehicle() {
  const { register } = useForm();
  const [loading, setLoading] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const { selectedVehicle } = useSelector((store) => store.vehicles);
  const { orderArray } = useSelector((store) => store.orders);
  const [vehicleOrders, setVehicleOrders] = useState([]);
  const dispatch = useDispatch();

  const checkVehicleSubmit = async () => {
    const vehicleData = document.querySelector('#f_placa').value;
    NotificationManager.info('Consultando..', 'Información');
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(vehicleDataActions.getVehicleByID(vehicleData));
    setLoading(false);
  };

  const changeAccordionVision = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (selectedVehicle.placa) {
      setVehicleOrders(
        orderArray.filter(
          (order) =>
            // eslint-disable-next-line
            order.vehiculo.placa.toUpperCase() ===
            selectedVehicle.placa.toUpperCase(),
        ),
      );
    } else {
      setVehicleOrders([]);
    }
  }, [selectedVehicle, orderArray]);

  useEffect(() => {
    setVehicleOrders([]);
    dispatch(vehicleDataActions.setDefaultValue());
  }, [dispatch]);

  return (
    <div>
      {selectedVehicle && true}
      <Heading text="Control de Taller" />
      <NotificationContainer />
      <section
        className={`container max-w-screen-lg p-4 mx-auto border  ${
          loading ? 'bg-gray-300 grayscale pointer-events-none' : ''
        }`}
      >
        <ul className="grid gap-2 p-0 list-none print:hidden">
          <li className="h-10 text-center sm:text-left">
            <h2 className="text-base font-bold md:text-lg">Formulario</h2>
          </li>
          <li className="flex flex-col w-full gap-2 sm:items-center sm:flex-row">
            <fieldset className="grow">
              <Input
                label="Placa"
                name="f_placa"
                id="f_placa"
                complement="w-full uppercase"
                method={register}
              />
            </fieldset>
            <fieldset className="flex justify-end sm:justify-center print:hidden">
              <button
                type="button"
                onClick={checkVehicleSubmit}
                className="flex items-center gap-1 p-1 px-4 text-sm text-white transition bg-blue-700 border rounded-md md:hover:shadow-2xl md:hover:scale-105"
                id="submit"
              >
                <i className="fas fa-search" />
                Consultar
              </button>
            </fieldset>
          </li>
        </ul>
        <div className="grid gap-5 mt-8">
          <header className="text-center sm:text-left">
            <h3 className="text-3xl font-bold md:text-4xl">Vehículo</h3>
          </header>
          <div className="grid grid-cols-2 gap-5 mt-2 sm:grid-cols-4">
            <div className="p-2 text-center border rounded-md sm:text-left">
              <h4 className="text-lg font-semibold">Placa:</h4>
              <p className="text-2xl font-bold text-blue-700 uppercase truncate text-ellipsis">
                {selectedVehicle.placa ? selectedVehicle.placa : '----'}
              </p>
            </div>
            <div className="p-2 text-center border rounded-md sm:text-left">
              <h4 className="text-lg font-semibold">Marca:</h4>
              <p className="text-2xl font-bold text-blue-700 capitalize truncate text-ellipsis">
                {selectedVehicle.marca ? selectedVehicle.marca : '----'}
              </p>
            </div>
            <div className="p-2 text-center border rounded-md sm:text-left">
              <h4 className="text-lg font-semibold">Modelo:</h4>
              <p className="text-2xl font-bold text-blue-700 capitalize truncate text-ellipsis">
                {selectedVehicle.modelo ? selectedVehicle.modelo : '----'}
              </p>
            </div>
            <div className="p-2 text-center border rounded-md sm:text-left">
              <h4 className="text-lg font-semibold">Año:</h4>
              <p className="text-2xl font-bold text-blue-700 capitalize truncate text-ellipsis">
                {selectedVehicle.anio ? selectedVehicle.anio : '----'}
              </p>
            </div>
          </div>
        </div>
        <div className="grid mt-8">
          <header className="mb-3 text-center sm:text-left">
            <h3 className="text-2xl font-bold ">Historial de Ordenes</h3>
          </header>
          {vehicleOrders.map((order, index) => (
            <Accordion
              key={order.id}
              codigo={order.id}
              index={index}
              expandedIndex={expandedIndex}
              toggle={changeAccordionVision}
              date={order.fecha}
              text="Welcome World!"
              order={order}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Vehicle;
