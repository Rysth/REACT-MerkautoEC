import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  vehicleDataActions,
  destroyVehicle,
  fetchVehicles,
} from '../../redux/slices/vehicleDataSlice';
import Heading from '../../components/Heading/Heading';

function Vehicle() {
  const [searchData, setSearchData] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [vehicleSelected, setVehicleSelected] = useState(null);
  const { matchedElements } = useSelector((store) => store.vehicles);
  const dispatch = useDispatch();

  const handleSearchData = (event) => {
    const inputValue = event.target.value;

    // Update the state and use the inputValue directly
    setSearchData(inputValue);

    // Use inputValue directly in the condition
    if (inputValue === '') {
      dispatch(vehicleDataActions.startArrays());
    } else {
      dispatch(vehicleDataActions.searchVehicle(inputValue));
    }
  };

  const handleDeleteElement = (elementID) => {
    dispatch(destroyVehicle(elementID)).then(() => dispatch(fetchVehicles()));
  };

  const handleModalOpen = (vehicleID = null) => {
    if (vehicleID) {
      setVehicleSelected(
        matchedElements.find((vehicle) => vehicle.id === vehicleID),
      );
    } else {
      setVehicleSelected(null);
    }
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    handleModalClose();
    console.log(vehicleSelected);
  }, []);

  useEffect(() => {}, [matchedElements]);

  return (
    <section className="flex flex-col h-full">
      <Heading text="Vehículos" />
      <div className="flex flex-col max-h-[28rem] sm:max-h-[30rem] 2xl:max-h-[35rem]">
        <div className="flex items-center gap-2 py-2 text-sm sm:py-3">
          <input
            type="text"
            aria-label={`Vehicle search bar value: ${searchData}`}
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
                <th className="font-normal pb-2 w-[8rem]">Placa</th>
                <th className="font-normal pb-2 w-[10rem]">Marca</th>
                <th className="font-normal pb-2 w-[8rem]">Modelo</th>
                <th className="font-normal pb-2 w-[10rem]">Cliente</th>
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
                  <td className="py-2">{data.placa}</td>
                  <td className="py-2">{data.marca}</td>
                  <td className="py-2">{data.modelo}</td>
                  <td className="py-2 ">{data.customer.nombre}</td>
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
      {showModal && <p>Hola</p>}
    </section>
  );
}

export default Vehicle;
