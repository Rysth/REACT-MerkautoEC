import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { customerDataActions } from '../../redux/slices/customerDataSlice';

function OrderModal({ handleModalClose }) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Handle form submission logic with the form data
    dispatch(customerDataActions.addNewCustomer(data));
    // Close the modal
    handleModalClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-75 z-[100]">
      <article className="p-5 bg-white rounded-lg w-[30rem]">
        <header>
          <h2 className="text-xl font-bold sm:text-3xl">Nuevo Cliente</h2>
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
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('cedula')}
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
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('nombre')}
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
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('celular')}
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
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('email')}
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
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('direccion')}
                required
              />
            </label>
          </fieldset>
          {/* eslint-enable */}
          <fieldset className="flex items-center justify-end gap-1">
            <button type="submit" className="float-right btn btn-success">
              Guardar
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

OrderModal.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
};

export default OrderModal;
