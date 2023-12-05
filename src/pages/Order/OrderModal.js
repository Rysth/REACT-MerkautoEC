import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import {
  createOrder,
  fetchOrders,
  updateOrder,
} from '../../redux/slices/orderDataSlice';

function OrderModal({ handleModalClose, orderData }) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [customer, setCustomer] = useState(
    orderData ? orderData.customer_id : 1,
  );
  const { userCredentials } = useSelector((store) => store.credentials);
  const { matchedElements } = useSelector((store) => store.orders);
  const { customersArray } = useSelector((store) => store.customers);
  const { vehiclesArray } = useSelector((store) => store.vehicles);

  const onSubmit = (newData) => {
    console.log(newData);
    const orderID = newData.id;
    const orderExist = matchedElements.find((order) => order.id === orderID);

    if (orderExist && orderExist !== orderData) {
      NotificationManager.error('¡Orden ya registrada!', 'Advertencia');
      return;
    }

    /* Creating a New Order */
    if (!orderExist && !orderData) {
      dispatch(createOrder(newData))
        .then(() => dispatch(fetchOrders()))
        .finally(() => handleModalClose());
      return;
    }

    dispatch(
      updateOrder({
        orderData: newData,
        orderID: orderData.id,
      }),
    )
      .then(() => dispatch(fetchOrders()))
      .finally(() => handleModalClose());
  };
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black backdrop-grayscale bg-opacity-75 z-[100] p-4 ">
      <article className="p-4 sm:p-6 bg-white rounded-lg w-full sm:w-[30rem] h-full sm:h-max overflow-auto">
        <header>
          <h2 className="text-2xl font-bold sm:text-3xl">
            {orderData ? 'Actualizar Orden' : 'Nueva Orden'}
          </h2>
        </header>
        <form
          action="#"
          className="grid gap-5 mt-5 text-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* eslint-disable */}
          <fieldset className="grid gap-3 sm:grid-cols-2">
            <label
              htmlFor="customer_id"
              className="relative grid gap-2 overflow-auto font-semibold"
            >
              Cliente:
              <select
                {...register('customer_id')}
                className="flex-1p-2 font-normal border rounded-lg focus:outline-none focus:border-gray-500 max-w-[210px]"
                defaultValue={orderData ? orderData.customer.id : ''}
                onChange={(e) => setCustomer(parseInt(e.target.value))}
              >
                {customersArray.map((customer) => (
                  <option
                    value={customer.id}
                    key={customer.id}
                    className="truncate text-ellipsis max-w-[1em]"
                  >
                    {`${customer.cedula} - ${customer.nombre}`}
                  </option>
                ))}
              </select>
            </label>
            <label
              htmlFor="vehiculo"
              className="relative grid gap-2 font-semibold"
            >
              Vehículo:
              <select
                {...register('vehicle_id')}
                className="flex-1 p-2 font-normal border rounded-lg focus:outline-none focus:border-gray-500"
                defaultValue={orderData ? orderData.vehicle.id : ''}
              >
                {customer &&
                  vehiclesArray
                    .filter((element) => element.customer_id === customer)
                    .map((vehicle) => (
                      <option value={vehicle.id} key={vehicle.id}>
                        {vehicle.placa}
                      </option>
                    ))}
              </select>
            </label>
          </fieldset>
          <fieldset className="grid gap-3 sm:grid-cols-2">
            <label
              htmlFor="order_date"
              className="relative grid gap-2 font-semibold"
            >
              Fecha:
              <input
                type="date"
                className="flex-1 p-2 font-normal border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('order_date')}
                defaultValue={orderData ? orderData.order_date : ''}
                required
              />
            </label>
            <label htmlFor="fuel" className="relative grid gap-2 font-semibold">
              Combustible:
              <input
                type="range"
                className="flex-1 p-2 font-normal border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('fuel')}
                defaultValue={orderData ? orderData.fuel : ''}
                required
              />
            </label>
          </fieldset>
          <fieldset className="grid gap-3 sm:grid-cols-2">
            <label
              htmlFor="receptionist"
              className="relative grid gap-2 font-semibold"
            >
              Recepcionista:
              <input
                type="text"
                className="flex-1 p-2 font-normal bg-gray-300 border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('receptionist')}
                defaultValue={userCredentials ? userCredentials.name : ''}
                required
                readOnly
              />
            </label>
            <label
              htmlFor="technician"
              className="relative grid gap-2 font-semibold"
            >
              Técnico:
              <input
                type="text"
                className="flex-1 p-2 font-normal border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('technician')}
                defaultValue={orderData ? orderData.technician : ''}
                required
              />
            </label>
          </fieldset>
          <fieldset className="grid">
            <label
              htmlFor="description"
              className="relative grid gap-2 font-semibold "
            >
              Descripción:
              <textarea
                type="text"
                className="flex-1 p-2 font-normal border rounded-lg resize-none focus:outline-none focus:border-gray-500"
                {...register('description')}
                defaultValue={orderData ? orderData.description : ''}
                required
              />
            </label>
          </fieldset>
          {orderData && (
            <fieldset>
              <label
                htmlFor="active"
                className="relative grid gap-2 font-semibold"
              >
                Estado:
                <select
                  {...register('active')}
                  className="flex-1 p-2 border rounded-lg font-norma focus:outline-none focus:border-gray-500"
                  defaultValue={orderData ? orderData.active : ''}
                >
                  <option value={true}>Activo</option>
                  <option value={false}>Completado</option>
                </select>
              </label>
            </fieldset>
          )}
          <fieldset className="flex items-center justify-end gap-1">
            <button type="submit" className="float-right btn btn-success">
              {orderData ? 'Actualizar' : 'Guardar'}
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

OrderModal.defaultProps = {
  orderData: null,
};

OrderModal.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  orderData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    customer_id: PropTypes.number.isRequired,
    vehicle_id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    order_date: PropTypes.string.isRequired,
    fuel: PropTypes.string.isRequired,
    receptionist: PropTypes.string.isRequired,
    technician: PropTypes.string.isRequired,
  }),
};

export default OrderModal;
