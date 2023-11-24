import PropTypes from 'prop-types';

function OrderModal({ handleModalClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-75 z-[100]">
      <article className="p-5 bg-white rounded-lg w-[30rem]">
        <header>
          <h2 className="text-xl font-bold sm:text-3xl">Nueva Orden</h2>
        </header>
        <form action="#" className="grid gap-5 mt-5 text-sm">
          <fieldset className="">
            <label
              htmlFor="cliente"
              className="relative grid gap-2 font-semibold"
            >
              Cliente:
              <span className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-gray-500"
                  placeholder="Cédula.."
                />
                <button
                  type="button"
                  aria-label="Cliente identifier"
                  className=" btn btn-info"
                >
                  Buscar
                </button>
              </span>
            </label>
          </fieldset>
          <fieldset className="">
            <label
              htmlFor="vehiculo"
              className="relative grid gap-2 font-semibold"
            >
              Vehículo:
              <span className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-gray-500"
                  placeholder="Placa.."
                />
                <button
                  type="button"
                  aria-label="Cliente identifier"
                  className=" btn btn-info"
                >
                  Buscar
                </button>
              </span>
            </label>
          </fieldset>
          <fieldset>
            <label
              htmlFor="kilometraje"
              className="relative grid gap-2 font-semibold"
            >
              Kilometraje:
              <span className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-gray-500"
                  placeholder="Cantidad.."
                />
              </span>
            </label>
          </fieldset>
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
