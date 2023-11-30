import { useState } from 'react';
import {
  customerDataActions,
  destroyCustomer,
  fetchCustomers,
} from '../../redux/slices/customerDataSlice';
import CustomerModal from './CustomerModal';
import Heading from '../../components/Heading/Heading';
import SearchForm from '../../components/Forms/SearchForm/SearchForm';
import useSearchModalState from '../../hooks/useSearchModalState/useSearchModalState';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';

function Customer() {
  const {
    searchData,
    showModal,
    elementSelected,
    matchedElements,
    handleSearchData,
    handleDeleteElement,
    handleModalOpen,
    handleModalClose,
  } = useSearchModalState(
    'customers',
    customerDataActions,
    destroyCustomer,
    fetchCustomers,
  );

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [element, setElement] = useState('');

  const handleDeleteConfirmation = (elementID) => {
    setElement(elementID);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    handleDeleteElement(element);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <section className="flex flex-col h-full">
      <Heading text="Clientes" />
      <div className="flex flex-col max-h-[28rem] sm:max-h-[30rem] 2xl:max-h-[35rem]">
        <SearchForm
          searchData={searchData}
          handleSearchData={handleSearchData}
        />
        <div className="w-full mt-5 overflow-auto border-b">
          <table className="relative w-full text-sm min-w-[60rem]">
            <thead className="sticky top-0 text-gray-400 bg-white ">
              <tr className="text-left border-b">
                <th className="font-normal pb-2 w-[3rem]">#</th>
                <th className="font-normal pb-2 w-[8rem]">Cedula</th>
                <th className="font-normal pb-2 w-[10rem]">Nombre</th>
                <th className="font-normal pb-2 w-[8rem]">Celular</th>
                <th className="font-normal pb-2 w-[10rem]">Email</th>
                <th className="font-normal pb-2 w-[10rem] text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="">
              {matchedElements.map((data, index) => (
                <tr
                  key={data.id}
                  className="py-2 text-xs sm:text-sm md:hover:bg-gray-100"
                >
                  <td className="py-2 font-bold">{index + 1}</td>
                  <td className="py-2">{data.cedula}</td>
                  <td className="py-2">{data.nombre}</td>
                  <td className="py-2">{data.celular}</td>
                  <td className="py-2 ">
                    <a href={`mailto:${data.email}`} className="underline">
                      {data.email}
                    </a>
                  </td>
                  <td className="flex items-center justify-center gap-1 py-2">
                    <button
                      type="button"
                      aria-label="Edit button"
                      className="text-white bg-blue-600 btn"
                      onClick={() => {
                        handleModalOpen(data.id);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      aria-label="Edit button"
                      className="text-white btn-danger btn"
                      onClick={() => {
                        handleDeleteConfirmation(data.id);
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 mt-auto text-sm">
        <button
          type="button"
          aria-label="New Order button"
          className="btn btn-success"
          onClick={() => {
            handleModalOpen();
          }}
        >
          Crear
        </button>
      </div>
      {showModal && (
        <CustomerModal
          handleModalClose={handleModalClose}
          customerData={elementSelected}
        />
      )}
      {showConfirmation && (
        <ConfirmationModal
          handleConfirmDelete={handleConfirmDelete}
          handleCancel={handleCancel}
        />
      )}
    </section>
  );
}

export default Customer;
