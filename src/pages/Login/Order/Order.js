import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderDataActions } from '../../../redux/slices/orderDataSlice';
import OrderModal from './OrderModal';

function Order() {
  const [searchData, setSearchData] = useState('');
  const { matchedOrders } = useSelector((store) => store.orders);
  const dispatch = useDispatch();

  const handleSearchData = (event) => {
    const inputValue = event.target.value;
    setSearchData(inputValue);

    if (searchData === '') {
      dispatch(orderDataActions.startArrays());
    } else {
      dispatch(orderDataActions.searchOrder(inputValue));
    }
  };

  const handleDeleteOrder = (elementID) => {
    dispatch(orderDataActions.deleteOrder(elementID));
  };

  useEffect(() => {
    dispatch(orderDataActions.startArrays());
  }, [dispatch]);

  return (
    <section className="flex flex-col h-full">
      <header>
        <h2 className="text-xl font-semibold sm:text-3xl lg:text-4xl">
          Ordenes
        </h2>
      </header>
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
                <th className="w-40 pb-2 font-normal ">#</th>
                <th className="w-48 pb-2 font-normal">Cliente</th>
                <th className="w-48 pb-2 font-normal">Vehículo</th>
                <th className="w-32 pb-2 font-normal">Fecha</th>
                <th className="w-32 pb-2 font-normal">Estado</th>
                <th className="w-32 pb-2 font-normal">Acciones</th>
              </tr>
            </thead>
            <tbody className="">
              {matchedOrders.map((data) => (
                <tr key={data.id} className="py-2 text-sm ">
                  <td className="py-2">{data.id}</td>
                  <td className="py-2">{data.cliente}</td>
                  <td className="py-2">{data.vehiculo}</td>
                  <td className="py-2">{data.fecha}</td>
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
                      className="hidden text-white bg-red-700 btn"
                      onClick={() => {
                        handleDeleteOrder(data.id);
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
        >
          Crear
        </button>
      </div>
      <OrderModal />
    </section>
  );
}

export default Order;
