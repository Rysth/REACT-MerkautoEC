import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import {
  createCustomer,
  fetchCustomers,
  updateCustomer,
} from '../../redux/slices/customerDataSlice';

function CustomerModal({ handleModalClose, customerData }) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { matchedElements } = useSelector((store) => store.customers);

  const onSubmit = (newData) => {
    const customerID = newData.cedula;
    const customerExist = matchedElements.find(
      (customer) => customer.cedula.toUpperCase() === customerID,
    );

    if (customerExist && customerExist !== customerData) {
      NotificationManager.error('¡Cliente ya registrado!', 'Advertencia');
      return;
    }

    /* Creating a New Customer */
    if (!customerExist && !customerData) {
      dispatch(createCustomer(newData))
        .then(() => dispatch(fetchCustomers()))
        .finally(() => handleModalClose());
      return;
    }

    dispatch(
      updateCustomer({
        customerData: newData,
        customerID: customerData.id,
      }),
    )
      .then(() => dispatch(fetchCustomers()))
      .finally(() => handleModalClose());
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black backdrop-grayscale bg-opacity-75 z-[100] p-4 ">
      <article className="p-4 sm:p-6 bg-white rounded-lg w-full sm:w-[28rem] h-full sm:h-max overflow-auto">
        <header>
          <h2 className="text-2xl font-bold sm:text-3xl">
            {customerData ? 'Actualizar Cliente' : 'Nuevo Cliente'}
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
              htmlFor="cedula"
              className="relative grid gap-2 font-semibold"
            >
              Cédula:
              <input
                id="cedula"
                type="text"
                className="flex-1 p-2 font-normal border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('cedula')}
                defaultValue={customerData ? customerData.cedula : ''}
                required
              />
            </label>
            <label
              htmlFor="nombre"
              className="relative grid gap-2 font-semibold"
            >
              Nombre:
              <input
                id="nombre"
                type="text"
                className="flex-1 p-2 font-normal border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('nombre')}
                defaultValue={customerData ? customerData.nombre : ''}
                required
              />
            </label>
          </fieldset>
          <fieldset className="grid gap-3 sm:grid-cols-2">
            <label
              htmlFor="celular"
              className="relative grid gap-2 font-semibold"
            >
              Celular:
              <input
                type="text"
                className="flex-1 p-2 font-normal border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('celular')}
                defaultValue={customerData ? customerData.celular : ''}
                required
              />
            </label>
            <label
              htmlFor="email"
              className="relative grid gap-2 font-semibold"
            >
              Email:
              <input
                type="email"
                className="flex-1 p-2 font-normal border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('email')}
                defaultValue={customerData ? customerData.email : ''}
                required
              />
            </label>
          </fieldset>
          <fieldset>
            <label
              htmlFor="direccion"
              className="relative grid gap-2 font-semibold"
            >
              Dirección:
              <input
                type="text"
                className="flex-1 p-2 font-normal border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('direccion')}
                defaultValue={customerData ? customerData.direccion : ''}
                required
              />
            </label>
          </fieldset>
          {/* eslint-enable */}
          <fieldset className="flex items-center justify-end gap-1 mt-auto">
            <button type="submit" className="float-right btn btn-success">
              {customerData ? 'Actualizar' : 'Guardar'}
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

CustomerModal.defaultProps = {
  customerData: null,
};

CustomerModal.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  customerData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cedula: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    celular: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    direccion: PropTypes.string.isRequired,
  }),
};

export default CustomerModal;
