import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import {
  createVehicle,
  fetchVehicles,
  updateVehicle,
} from '../../redux/slices/vehicleDataSlice';

function VehicleModal({ handleModalClose, vehicleData }) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { matchedElements } = useSelector((store) => store.vehicles);
  const { customersArray } = useSelector((store) => store.customers);

  const onSubmit = (newData) => {
    const vehicleID = newData.placa;
    const vehicleExist = matchedElements.find(
      (vehicle) => vehicle.placa.toUpperCase() === vehicleID,
    );

    if (vehicleExist && vehicleExist !== vehicleData) {
      NotificationManager.error('¡Vehículo ya registrado!', 'Advertencia');
      return;
    }

    /* Creating a New Customer */
    if (!vehicleExist && !vehicleData) {
      dispatch(createVehicle(newData))
        .then(() => dispatch(fetchVehicles()))
        .finally(() => handleModalClose());
      return;
    }

    dispatch(
      updateVehicle({
        vehicleData: newData,
        vehicleID: vehicleData.id,
      }),
    )
      .then(() => dispatch(fetchVehicles()))
      .finally(() => handleModalClose());
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black backdrop-grayscale bg-opacity-75 z-[100] p-4 ">
      <article className="p-4 sm:p-6 bg-white rounded-lg w-full sm:w-[30rem]  h-full sm:h-max overflow-auto">
        <header>
          <h2 className="text-2xl font-bold sm:text-3xl">
            {vehicleData ? 'Actualizar Vehículo' : 'Nuevo Vehículo'}
          </h2>
        </header>
        {/* eslint-disable */}
        <form
          action="#"
          className="grid gap-5 mt-5 text-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset className="grid gap-3 sm:grid-cols-2">
            <label
              htmlFor="cliente"
              className="relative grid gap-2 font-semibold"
            >
              Cliente:
              <select
                {...register('customer_id')}
                className="flex-1 p-2 font-normal border rounded-lg focus:outline-none focus:border-gray-500 max-w-[210px]"
                defaultValue={vehicleData ? vehicleData.customer.id : ''}
              >
                {customersArray.map((customer) => (
                  <option value={customer.id} key={customer.id}>
                    {`${customer.cedula} - ${customer.nombre}`}
                  </option>
                ))}
              </select>
            </label>
            <label
              htmlFor="placa"
              className="relative grid gap-2 font-semibold"
            >
              Placa:
              <input
                id="placa"
                type="text"
                className="flex-1 p-2 font-normal border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('placa')}
                defaultValue={vehicleData ? vehicleData.placa : ''}
                required
              />
            </label>
          </fieldset>
          <fieldset className="grid gap-3 sm:grid-cols-2">
            <label
              htmlFor="marca"
              className="relative grid gap-2 font-semibold"
            >
              Marca:
              <input
                type="text"
                className="flex-1 p-2 font-normal border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('marca')}
                defaultValue={vehicleData ? vehicleData.marca : ''}
                required
              />
            </label>
            <label
              htmlFor="modelo"
              className="relative grid gap-2 font-semibold"
            >
              Modelo:
              <input
                type="text"
                className="flex-1 p-2 font-normal border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('modelo')}
                defaultValue={vehicleData ? vehicleData.modelo : ''}
                required
              />
            </label>
          </fieldset>
          <fieldset className="grid gap-3 sm:grid-cols-2">
            <label
              htmlFor="color"
              className="relative grid gap-2 font-semibold"
            >
              Color:
              <input
                type="color"
                className="flex-1 w-full h-full p-2 font-normal border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('color')}
                defaultValue={vehicleData ? vehicleData.color : ''}
                required
              />
            </label>
            <label
              htmlFor="chasis"
              className="relative grid gap-2 font-semibold"
            >
              Chasis:
              <input
                type="text"
                className="flex-1 p-2 font-normal border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('chasis')}
                defaultValue={vehicleData ? vehicleData.chasis : ''}
                required
              />
            </label>
          </fieldset>
          <fieldset className="grid gap-3 sm:grid-cols-2">
            <label
              htmlFor="motor"
              className="relative grid gap-2 font-semibold"
            >
              Motor:
              <input
                type="text"
                className="flex-1 p-2 font-normal border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('motor')}
                defaultValue={vehicleData ? vehicleData.motor : ''}
                required
              />
            </label>
            <label
              htmlFor="clave"
              className="relative grid gap-2 font-semibold"
            >
              Clave:
              <input
                type="text"
                className="flex-1 p-2 font-normal border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('clave')}
                defaultValue={vehicleData ? vehicleData.clave : ''}
              />
            </label>
          </fieldset>
          <fieldset className="grid gap-3">
            <label
              htmlFor="kilometraje"
              className="relative grid gap-2 font-semibold"
            >
              Kilometraje:
              <input
                type="text"
                className="flex-1 p-2 font-normal border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('kilometraje')}
                defaultValue={vehicleData ? vehicleData.kilometraje : ''}
              />
            </label>
          </fieldset>
          {/* eslint-enable */}
          <fieldset className="flex items-center justify-end gap-1 mt-auto">
            <button type="submit" className="float-right btn btn-success">
              {vehicleData ? 'Actualizar' : 'Guardar'}
            </button>
            <button
              type="button"
              className="float-right btn btn-danger"
              onClick={() => {
                handleModalClose();
              }}
            >
              Cancelar
            </button>
          </fieldset>
        </form>
      </article>
    </div>
  );
}

VehicleModal.defaultProps = {
  vehicleData: null,
};

VehicleModal.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  vehicleData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    customer: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
    }),
    placa: PropTypes.string.isRequired,
    marca: PropTypes.string.isRequired,
    modelo: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    chasis: PropTypes.string.isRequired,
    motor: PropTypes.string.isRequired,
  }),
};

export default VehicleModal;
