import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  customerDataActions,
  destroyCustomer,
  fetchCustomers,
} from '../../redux/slices/customerDataSlice';
import CustomerModal from './CustomerModal';
import Heading from '../../components/Heading/Heading';

function Customer() {
  const [searchData, setSearchData] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [customerSelected, setCustomerSelected] = useState(null);
  const { matchedElements } = useSelector((store) => store.customers);
  const dispatch = useDispatch();

  const handleSearchData = (event) => {
    const inputValue = event.target.value;

    // Update the state and use the inputValue directly
    setSearchData(inputValue);

    // Use inputValue directly in the condition
    if (inputValue === '') {
      dispatch(customerDataActions.startArrays());
    } else {
      dispatch(customerDataActions.searchCustomer(inputValue));
    }
  };

  const handleDeleteElement = (elementID) => {
    dispatch(destroyCustomer(elementID)).then(() => dispatch(fetchCustomers()));
  };

  const handleModalOpen = (customerID = null) => {
    if (customerID) {
      setCustomerSelected(
        matchedElements.find((customer) => customer.id === customerID),
      );
    } else {
      setCustomerSelected(null);
    }
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {}, [matchedElements]);

  return (
    <section className="flex flex-col h-full">
      <Heading text="Clientes" />
      <div className="flex flex-col max-h-[30rem] 2xl:max-h-[35rem]">
        <div className="flex items-center gap-2 py-4 text-sm">
          <input
            type="text"
            aria-label={`Customer search bar value: ${searchData}`}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-500"
            placeholder="Buscar..."
            onChange={handleSearchData}
            onPaste={handleSearchData}
          />
        </div>
        <div className="w-full mt-5 overflow-auto border-b">
          <table className="relative w-full text-sm min-w-[60rem]">
            <thead className="sticky top-0 text-gray-400 bg-white ">
              <tr className="text-left border-b">
                <th className="font-normal pb-2 w-[3rem]">#</th>
                <th className="font-normal pb-2 w-[6rem]">Cedula</th>
                <th className="font-normal pb-2 w-[15rem]">Nombre</th>
                <th className="font-normal pb-2 w-[8rem]">Celular</th>
                <th className="font-normal pb-2 w-[8rem]">Email</th>
                <th className="font-normal pb-2 w-[10rem]">Acciones</th>
              </tr>
            </thead>
            <tbody className="">
              {matchedElements.map((data, index) => (
                <tr key={data.id} className="py-2 text-sm md:hover:bg-gray-100">
                  <td className="py-2">{index + 1}</td>
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
      {showModal && (
        <CustomerModal
          handleModalClose={handleModalClose}
          customerData={customerSelected}
        />
      )}
    </section>
  );
}

export default Customer;
