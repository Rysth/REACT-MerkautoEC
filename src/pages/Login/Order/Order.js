import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderDataActions } from '../../../redux/slices/orderDataSlice';

function Order() {
  const [searchData, setSearchData] = useState('');
  const { matchedOrders } = useSelector((store) => store.orders);
  const dispatch = useDispatch();

  const handleSearchData = (event) => {
    const inputValue = event.target.value;
    setSearchData(inputValue);

    if (searchData === '') {
      dispatch(orderDataActions.setCopyToMatched());
    } else {
      dispatch(orderDataActions.searchOrder(inputValue));
    }
  };

  return (
    <section className="h-full">
      <header>
        <h2 className="text-xl font-semibold sm:text-3xl lg:text-4xl">
          Ordenes
        </h2>
      </header>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 py-4 text-sm">
          <input
            type="text"
            aria-label="Orden/Placa searcher"
            className="flex-1 px-3 py-1.5 rounded-lg border focus:outline-none focus:border-gray-500"
            placeholder="Buscar..."
            onChange={handleSearchData}
          />
        </div>
        <div className="flex-1 w-full mt-5 overflow-auto">
          <table className="w-full h-full text-sm ">
            <thead className="text-gray-400 border-b">
              <tr className="font-normal text-left">
                <th className="w-40 pb-2 font-normal ">#</th>
                <th className="pb-2 font-normal w-72">Cliente</th>
                <th className="pb-2 font-normal w-72">Vehículo</th>
                <th className="w-48 pb-2 font-normal">Fecha de Entrega</th>
                <th className="w-32 pb-2 font-normal">Estado</th>
                <th className="pb-2 font-normal w-60">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {matchedOrders.map((data) => (
                <tr key={data.id} className="w-full py-2 text-sm">
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
                      className="text-white bg-red-700 btn"
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
    </section>
  );
}

export default Order;
