import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  vehicleDataActions,
  destroyVehicle,
  fetchVehicles,
} from '../../redux/slices/vehicleDataSlice';
import Heading from '../../components/Heading/Heading';
import VehicleModal from './VehicleModal';
import SearchForm from '../../components/Forms/SearchForm/SearchForm';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';
import useSearchModalState from '../../hooks/useSearchModalState/useSearchModalState';

function Vehicle() {
  const {
    searchData,
    showModal,
    elementSelected,
    matchedElements,
    handleSearchData,
    handleDeleteElement,
    handleModalOpen,
    handleModalClose,
    records,
    loadMore,
  } = useSearchModalState(
    'vehicles',
    vehicleDataActions,
    destroyVehicle,
    fetchVehicles,
  );

  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [element, setElement] = useState('');
  const { customersArray } = useSelector((store) => store.customers);

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
    dispatch(fetchVehicles());
  }, [dispatch]);

  return (
    <section className="h-full p-4">
      <div className="h-full p-6 bg-white rounded-2xl sm:p-10">
        <article className="flex flex-col h-full">
          <Heading text="Vehículos" />
          <div className="flex flex-col max-h-[28rem] sm:max-h-[30rem] 2xl:max-h-[35rem]">
            <SearchForm
              searchData={searchData}
              handleSearchData={handleSearchData}
            />
            <div
              className="w-full mt-5 overflow-auto border-b"
              id="scrollableDiv"
            >
              <InfiniteScroll
                dataLength={records}
                next={loadMore}
                hasMore={records < matchedElements.length}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
              >
                <table className="relative w-full text-sm min-w-[60rem]">
                  <thead className="sticky top-0 text-gray-400 bg-white ">
                    <tr className="text-left border-b">
                      <th className="font-normal pb-2 w-[3rem]">#</th>
                      <th className="font-normal pb-2 w-[6rem]">Placa</th>
                      <th className="font-normal pb-2 w-[15rem]">Cliente</th>
                      <th className="font-normal pb-2 w-[6rem]">Marca</th>
                      <th className="font-normal pb-2 w-[8rem]">Modelo</th>
                      <th className="font-normal pb-2 w-[8rem]">Color</th>
                      <th className="font-normal pb-2 w-[10rem] text-center">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {matchedElements.slice(0, records).map((data, index) => (
                      <tr
                        key={data.id}
                        className="py-2 text-xs sm:text-sm md:hover:bg-gray-100"
                      >
                        <td className="py-2 font-bold">{index + 1}</td>
                        <td className="py-2">{data.placa}</td>
                        <td className="py-2">{data.customer.nombre}</td>
                        <td className="py-2">{data.marca}</td>
                        <td className="py-2">{data.modelo}</td>
                        <td
                          style={{ backgroundColor: `${data.color}` }}
                          className="py-2"
                        >
                          <span className="opacity-0">{data.color}</span>
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
              </InfiniteScroll>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 mt-auto text-sm">
            <button
              type="button"
              aria-label="New Order button"
              className={`btn btn-success ${
                customersArray.length === 0 && 'grayscale pointer-events-none'
              }`}
              onClick={() => {
                handleModalOpen();
              }}
              disabled={customersArray.length === 0}
            >
              Crear
            </button>
          </div>
          {showModal && (
            <VehicleModal
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

export default Vehicle;
