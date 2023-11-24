import { useState } from 'react';

const customersArray = [
  {
    id: 1,
    cedula: '0931237663',
    nombre: 'Alice Johnson',
  },
  {
    id: 2,
    cedula: '0923456789',
    nombre: 'Bob Smith',
  },
  {
    id: 3,
    cedula: '0912345678',
    nombre: 'Charlie Brown',
  },
  {
    id: 4,
    cedula: '0945678901',
    nombre: 'David White',
  },
];

function OrderModal() {
  const [searchData, setSearchData] = useState();
  const [filteredData, setFilteredData] = useState([]);

  /* eslint-disable */
  const handleOnChange = (event) => {
    const input = event.target.value.toUpperCase();
    setSearchData(input);

    if (input.trim() === '') {
      setFilteredData([]);
    } else {
      setFilteredData(
        customersArray.filter(
          (element) =>
            element.cedula.toUpperCase().includes(searchData) ||
            element.nombre.toUpperCase().includes(searchData),
        ),
      );
    }
  };
  /* eslint-enable */

  const handleSelectValue = (event) => {
    const input = event.target.value;
    setSearchData(input);
    setFilteredData([]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-75 z-[100] ">
      <article className="p-5 bg-white rounded-lg w-[30rem]">
        <header>
          <h2 className="text-xl font-bold sm:text-3xl">Nueva Orden</h2>
        </header>
        <form action="#" className="mt-5 text-sm">
          <fieldset className="">
            <label
              htmlFor="cliente"
              className="relative grid gap-2 font-semibold"
            >
              Cliente:
              <input
                type="text"
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-gray-500"
                onChange={handleOnChange}
                value={searchData}
              />
              {filteredData.length > 0 && (
                <ul className="grid bg-white border rounded-lg max-h-[7rem] overflow-auto absolute w-full top-full shadow-md">
                  {filteredData.map((customer) => (
                    <li key={customer.id}>
                      <button
                        type="button"
                        aria-label={customer.cedula}
                        className="w-full p-2 text-left cursor-pointer hover:bg-gray-200"
                        onClick={handleSelectValue}
                        value={`${customer.cedula} - ${customer.nombre}`}
                      >
                        {`${customer.cedula} - ${customer.nombre}`}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </label>
          </fieldset>
        </form>
      </article>
    </div>
  );
}

export default OrderModal;
