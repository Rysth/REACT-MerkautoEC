import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customerDataActions } from '../../redux/slices/customerDataSlice';
import CustomerModal from './CustomerModal';
import Heading from '../../components/Heading/Heading';

function Customer() {
  const [searchData, setSearchData] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { matchedElements } = useSelector((store) => store.customers);
  const dispatch = useDispatch();

  const handleSearchData = (event) => {
    const inputValue = event.target.value;
    setSearchData(inputValue);

    if (searchData === '') {
      dispatch(customerDataActions.startArrays());
    } else {
      dispatch(customerDataActions.searchCustomer(inputValue));
    }
  };

  const handleDeleteElement = (elementID) => {
    dispatch(customerDataActions.deleteCustomer(elementID));
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(customerDataActions.startArrays());
  }, [dispatch]);

  return (
    <section className="flex flex-col h-full">
      <Heading text="Clientes" />
      <div className="flex flex-col max-h-[30rem] lg:max-h-[35rem]">
        <div className="flex items-center gap-2 py-4 text-sm">
          <input
            type="text"
            aria-label="Orden/Placa searcher"
            className="flex-1 px-3 py-1.5 rounded-lg border focus:outline-none focus:border-gray-500"
            placeholder="Buscar..."
            onChange={handleSearchData}
          />
        </div>
        <div className="w-full mt-5 overflow-auto border-b ">
          <table className="relative w-full text-sm min-w-[60rem]">
            <thead className="sticky top-0 text-gray-400 bg-white border-b">
              <tr className="font-normal text-left">
                <th className="w-20 pb-2 font-normal">#</th>
                <th className="pb-2 font-normal w-28">Cedula</th>
                <th className="w-48 pb-2 font-normal">Nombre</th>
                <th className="w-32 pb-2 font-normal">Celular</th>
                <th className="w-32 pb-2 font-normal">Email</th>
                <th className="w-32 pb-2 font-normal">Estado</th>
                <th className="w-32 pb-2 font-normal">Acciones</th>
              </tr>
            </thead>
            <tbody className="">
              {matchedElements.map((data) => (
                <tr key={data.id} className="py-2 text-sm ">
                  <td className="py-2">{data.id}</td>
                  <td className="py-2">{data.cedula}</td>
                  <td className="py-2">{data.nombre}</td>
                  <td className="py-2">{data.celular}</td>
                  <td className="py-2">{data.email}</td>
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
                  <td className="flex items-center justify-center gap-3 py-2">
                    <button
                      type="button"
                      aria-label="Edit button"
                      className="text-white bg-blue-600 btn"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      aria-label="Edit button"
                      className="hidden text-white btn-danger btn"
                      onClick={() => {
                        handleDeleteElement(data.id);
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
      {showModal && <CustomerModal handleModalClose={handleModalClose} />}
    </section>
  );
}

export default Customer;
