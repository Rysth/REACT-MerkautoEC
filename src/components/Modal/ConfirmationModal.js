import PropTypes from 'prop-types';

function ConfirmationModal({ handleConfirmDelete, handleCancel }) {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black backdrop-grayscale bg-opacity-75 z-[100] p-4 ">
      <div className="p-4 bg-white rounded-lg sm:h-max sm:p-6">
        <header className="text-center">
          <i className="text-8xl fa-solid fa-warning" />
          <h2 className="mt-3 text-base font-bold">
            ¿Estas segur@ de querer eliminar?
          </h2>
        </header>
        <div className="flex items-center justify-center gap-1 mt-3">
          <button
            type="button"
            onClick={handleConfirmDelete}
            className="btn btn-success"
          >
            Confirmar
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-danger"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmationModal.propTypes = {
  handleConfirmDelete: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default ConfirmationModal;
