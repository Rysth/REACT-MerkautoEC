import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  destroyOrder,
  fetchOrders,
  orderDataActions,
} from '../../redux/slices/orderDataSlice';
import OrderModal from './OrderModal';
import Heading from '../../components/Heading/Heading';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';
import SearchForm from '../../components/Forms/SearchForm/SearchForm';
import useSearchModalState from '../../hooks/useSearchModalState/useSearchModalState';

function Order() {
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
    'orders',
    orderDataActions,
    destroyOrder,
    fetchOrders,
  );

  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <section className="h-full p-4">
      <div className="h-full p-6 bg-white rounded-2xl sm:p-10">
        <article className="flex flex-col h-full">
          <Heading text="Ordenes" />
          <div className="flex flex-col max-h-[28rem] sm:max-h-[30rem] 2xl:max-h-[35rem]">
            <SearchForm
              searchData={searchData}
              handleSearchData={handleSearchData}
            />
            <div className="w-full mt-5 overflow-auto border-b ">
              <table className="relative w-full text-sm min-w-[60rem]">
                <thead className="sticky top-0 text-gray-400 bg-white">
                  <tr className="text-left border-b">
                    <th className="font-normal pb-2 w-[3rem]">#</th>
                    <th className="font-normal pb-2 w-[8rem]">Cliente</th>
                    <th className="font-normal pb-2 w-[10rem]">Vehículo</th>
                    <th className="font-normal pb-2 w-[10rem]">Fecha</th>
                    <th className="font-normal pb-2 w-[8rem]">Estado</th>
                    <th className="font-normal pb-2 w-[10rem] text-center">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {matchedElements.map((data, index) => (
                    <tr key={data.id} className="py-2 text-sm ">
                      <td className="py-2 font-bold">{index + 1}</td>
                      <td className="py-2">{data.customer.nombre}</td>
                      <td className="py-2">{data.vehicle.placa}</td>
                      <td className="py-2">{data.order_date}</td>
                      <td className="py-2 text-center">
                        <span
                          className={`status ${
                            data.estado === 'Activo'
                              ? 'status-active'
                              : 'status-complete'
                          }`}
                        >
                          {data.estado}
                        </span>
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
            <OrderModal
              handleModalClose={handleModalClose}
              vehicleData={elementSelected}
            />
          )}
          {showConfirmation && (
            <ConfirmationModal
              handleConfirmDelete={handleConfirmDelete}
              handleCancel={handleCancel}
            />
          )}
        </article>
      </div>
    </section>
  );
}

export default Order;
