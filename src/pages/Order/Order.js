import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input/Input';
// import AutoImage from '../../assets/images/auto/auto.png';

function Order() {
  const [actualDate, setActualDate] = useState();

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const clientData = Object.keys(data).reduce((acc, key) => {
      if (key.startsWith('cl_')) {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    console.log({
      cliente: clientData,
    });
  };

  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    setActualDate(getCurrentDate);
  }, []);

  return (
    <>
      <div>
        <section className="container max-w-screen-lg p-4 mx-auto border">
          <header className="flex flex-col items-center justify-between sm:flex-row">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Orden de Recepción
            </h1>
            <p className="flex items-center gap-1 text-sm font-bold">
              Fecha:
              <span>{actualDate}</span>
            </p>
          </header>
        </section>
      </div>
      <div>
        {/* eslint-disable */}
        <section className="container max-w-screen-lg p-4 mx-auto border">
          <form action="#" id="form" onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="grid gap-10 outline-none md:gap-16 sm:grid-cols-2">
              <ul className="grid gap-2 p-0 list-none">
                <li className="flex flex-col items-center justify-between mb-2 sm:flex-row">
                  <h2 className="text-base font-bold md:text-lg">
                    Datos del Cliente
                  </h2>
                </li>
                <Input
                  label="Cédula"
                  name="cl_cedula"
                  id="cl_cedula"
                  method={register}
                />
                <Input
                  label="Nombre"
                  name="cl_nombre"
                  id="cl_nombre"
                  method={register}
                />
                <Input
                  label="Responsable/Propietario"
                  name="cl_propietario"
                  id="cl_propietario"
                  method={register}
                />
                <Input
                  label="Dirección"
                  name="cl_direccion"
                  id="cl_direccion"
                  method={register}
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    label="Celular"
                    name="cl_celular"
                    id="cl_celular"
                    method={register}
                  />
                  <Input
                    label="Teléfono"
                    name="cl_telefono"
                    id="cl_telefono"
                    type="tel"
                    method={register}
                  />
                </div>
                <Input
                  label="Recibido por"
                  name="cl_recepcion"
                  id="cl_recepcion"
                  complement="grid grid-cols-[5.3rem_1fr]"
                  method={register}
                />
                <Input
                  label="Técnico Responsable"
                  name="cl_tecnico"
                  id="cl_tecnico"
                  complement="grid grid-cols-[9rem_1fr]"
                  method={register}
                />
              </ul>
              <fieldset>
                <button type="submit">Submit</button>
              </fieldset>
              {/* <ul className="grid gap-2 p-0 list-none">
                <li className="flex flex-col items-center justify-between mb-2 sm:flex-row">
                  <h2 className="text-base font-bold md:text-lg">
                    Datos del Vehículo
                  </h2>
                </li>
                <li className="flex items-center gap-4">
                  <label
                    className="flex items-center gap-4 text-sm"
                    htmlFor="v_placa"
                  >
                    Placa:
                    <input
                      type="text"
                      name="v_placa"
                      id="v_placa"
                      className="w-full p-0.5 px-2 border focus:border-gray-500 uppercase rounded-md outline-none bg-indigo-200 focus:bg-white text-sm"
                      required
                    />
                  </label>
                  <label
                    className="flex items-center gap-4 text-sm"
                    htmlFor="v_clave"
                  >
                    Clave:
                    <input
                      type="text"
                      name="v_clave"
                      id="v_clave"
                      className="w-full p-0.5 px-2 border focus:border-gray-500 rounded-md outline-none bg-gray-100 focus:bg-white text-sm"
                      required
                    />
                  </label>
                </li>
                <li className="flex items-center gap-4">
                  <label
                    className="flex items-center gap-4 text-sm"
                    htmlFor="v_marca"
                  >
                    Marca:
                    <input
                      type="text"
                      name="v_marca"
                      id="v_marca"
                      className="w-full p-0.5 px-2 border focus:border-gray-500 rounded-md outline-none bg-gray-100 focus:bg-white text-sm"
                      required
                    />
                  </label>

                  <label
                    className="flex items-center gap-4 text-sm"
                    htmlFor="v_color"
                  >
                    Color:
                    <input
                      type="color"
                      name="v_color"
                      id="v_color"
                      className="block w-full p-0.5 px-2 border focus:border-gray-500 rounded-md outline-none bg-gray-100 focus:bg-white text-sm"
                      required
                    />
                  </label>
                </li>
                <li className="flex items-center gap-4">
                  <label
                    className="flex items-center gap-4 text-sm"
                    htmlFor="v_modelo"
                  >
                    Modelo:
                    <input
                      type="text"
                      name="v_modelo"
                      id="v_modelo"
                      className="block w-full p-0.5 px-2 border focus:border-gray-500 rounded-md outline-none bg-gray-100 focus:bg-white text-sm"
                      required
                    />
                  </label>

                  <label
                    className="flex items-center w-full gap-4 text-sm"
                    htmlFor="v_anio"
                  >
                    Año:
                    <input
                      type="number"
                      name="v_anio"
                      id="v_anio"
                      min="1900"
                      max="2030"
                      className="block w-full p-0.5 px-2 border focus:border-gray-500 rounded-md outline-none bg-gray-100 focus:bg-white text-sm"
                      required
                    />
                  </label>
                </li>
                <li className="flex items-center gap-5">
                  <label
                    className="flex items-center gap-4 text-sm"
                    htmlFor="v_chasis"
                  >
                    Chasis:
                    <input
                      type="text"
                      name="v_chasis"
                      id="v_chasis"
                      className="w-full p-0.5 px-2 border focus:border-gray-500 rounded-md outline-none bg-gray-100 focus:bg-white text-sm"
                      required
                    />
                  </label>
                </li>
                <li>
                  <label
                    className="flex items-center gap-4 text-sm"
                    htmlFor="v_motor"
                  >
                    Motor:
                    <input
                      type="text"
                      name="v_motor"
                      id="v_motor"
                      className="w-full p-0.5 px-2 border focus:border-gray-500 rounded-md outline-none bg-gray-100 focus:bg-white text-sm"
                      required
                    />
                  </label>

                  <label
                    className="flex items-center gap-4 text-sm"
                    htmlFor="v_oc"
                  >
                    O/C:
                    <input
                      type="text"
                      name="v_oc"
                      id="v_oc"
                      className="w-full p-0.5 px-2 border focus:border-gray-500 rounded-md outline-none bg-gray-100 focus:bg-white text-sm"
                      required
                    />
                  </label>
                </li>
                <li>
                  <label className="text-sm md:w-40" htmlFor="v_fecha_entrega">
                    Fecha Entrega:
                    <input
                      type="datetime-local"
                      name="v_fecha_entrega"
                      id="v_fecha_entrega"
                      className="w-full p-0.5 px-2 border focus:border-gray-500 rounded-md outline-none bg-gray-100 focus:bg-white text-sm"
                      required
                    />
                  </label>
                </li>
                <li>
                  <label
                    className="flex items-center gap-4 text-sm"
                    htmlFor="v_kilometraje"
                  >
                    Kilometraje:
                    <input
                      type="number"
                      name="v_kilometraje"
                      id="v_kilometraje"
                      min="0"
                      value="0"
                      max="100000"
                      className="w-full p-0.5 px-2 border focus:border-gray-500 rounded-md outline-none bg-gray-100 focus:bg-white text-sm"
                      required
                    />
                  </label>
                </li>
                <li>
                  <label
                    className="flex items-center gap-4 text-sm"
                    htmlFor="v_detalle"
                  >
                    Detalles:
                    <input
                      type="text"
                      name="v_detalle"
                      id="v_detalle"
                      className="w-full p-0.5 px-2 border focus:border-gray-500 rounded-md outline-none bg-gray-100 focus:bg-white text-sm"
                    />
                  </label>
                </li>
              </ul> */}
            </fieldset>
            {/* <fieldset className="w-full mt-5 text-center">
              <header className="mb-3 text-center">
                <h2 className="text-base font-bold md:text-lg">
                  Trabajos de Mecánica / Electricidad / Aire Acondicionado
                </h2>
              </header>
              <textarea
                name="t_mecanica"
                id="t_mecanica"
                className="w-full h-20 p-2 bg-gray-100 border rounded-md outline-none resize-none md:p-4 focus:border-gray-500 focus:bg-white"
              />
            </fieldset>
            <fieldset className="w-full mt-5 text-center">
              <header className="mb-3 text-center">
                <h2 className="text-base font-bold md:text-lg">
                  Trabajos Pintura
                </h2>
              </header>
              <textarea
                name="t_pintura"
                id="t_pintura"
                className="w-full h-20 p-2 bg-gray-100 border rounded-md outline-none resize-none md:p-4 focus:border-gray-500 focus:bg-white"
              />
            </fieldset>
            <fieldset className="grid gap-10 mt-5 outline-none sm:grid-cols-[65%_1fr]">
              <div>
                <header className="mb-3 text-center">
                  <h2 className="text-base font-bold md:text-lg">
                    Equipamento del Auto
                  </h2>
                </header>
                <div
                  className="grid grid-cols-2 mt-5 gap-x-3 sm:grid-cols-3"
                  id="equipamento"
                >
                  Hello
                </div>
              </div>
              <div className="ml-auto">
                <header className="mb-3 text-center">
                  <h2 className="text-base font-bold md:text-lg">
                    Estado del Vehículo
                  </h2>
                </header>
                <div className="flex mt-5 md:justify-end">
                  <div
                    className="inline-block w-6 h-6 mr-2 transition bg-red-600 border border-gray-700 rounded-full cursor-move sm:w-6 sm:h-6 md:hover:scale-110 md:active:scale-125 status-circle"
                    draggable="true"
                    data-status="Red"
                  />
                  <div
                    className="inline-block w-6 h-6 mr-2 transition bg-orange-500 border border-gray-700 rounded-full cursor-move status-circle sm:w-6 sm:h-6 md:hover:scale-110 md:active:scale-125"
                    draggable="true"
                    data-status="Orange"
                  />
                  <div
                    className="inline-block w-6 h-6 mr-2 transition bg-green-600 border border-gray-700 rounded-full cursor-move status-circle sm:w-6 sm:h-6 md:hover:scale-110 md:active:scale-125"
                    draggable="true"
                    data-status="Green"
                  />
                </div>
                <div
                  className="relative mt-2 overflow-hidden border auto"
                  id="auto-picture"
                >
                  <img
                    className="p-5 auto-image lg:max-h-[270px] mx-auto"
                    src={AutoImage}
                    alt="Automovil functionality"
                    id="auto-image"
                  />
                </div>
                <div className="items-center justify-end gap-2 mt-3 content-actions">
                  <li className="flex items-center justify-between gap-4">
                    <label
                      className="flex items-center gap-4 text-sm"
                      htmlFor="v_combustible"
                    >
                      Combustible:
                      <input
                        type="range"
                        min="0"
                        max="100"
                        name="v_combustible"
                        id="v_combustible"
                        className="w-full p-0.5 px-2 border focus:border-gray-500 rounded-md outline-none bg-gray-100 focus:bg-white text-sm"
                      />
                    </label>
                  </li>
                  <button
                    type="button"
                    className="float-right px-3 py-2 mt-3 text-xs font-bold text-white transition bg-blue-700 rounded-md md:hover:scale-105 print:hidden"
                    id="undoButton"
                  >
                    <i className="fas fa-undo" />
                    Deshacer
                  </button>

                  <button
                    type="button"
                    className="hidden px-3 py-2 text-sm font-bold text-white transition bg-green-700 rounded-md md:hover:scale-105"
                    id="downloadButton"
                  >
                    <i className="fas fa-download" />
                    Descargar
                  </button>
                </div>
              </div>
            </fieldset>
            <fieldset className="w-full mt-5 text-center">
              <header className="text-center">
                <h2 className="text-sm font-bold">
                  Autorizo a la empresa MerkautoEC a realizar pruebas de mi
                  vehículo en la vía pública.
                </h2>
              </header>
              <div className="grid gap-10 pt-20 pb-12 sm:grid-cols-2">
                <div className="grid justify-center gap-2">
                  <hr className="border border-gray-300 w-50 sm:w-80" />
                  <p className="text-sm">Firma del Cliente</p>
                </div>
                <div className="grid justify-center gap-2">
                  <hr className="border border-gray-300 w-50 sm:w-80" />
                  <p className="text-sm">Firma del Responsable</p>
                </div>
              </div>
            </fieldset>
            <fieldset className="flex justify-center print:hidden">
              <button
                type="submit"
                className="p-2 px-4 text-sm text-white transition bg-green-600 border rounded-md md:hover:shadow-2xl md:hover:scale-105"
                id="submit"
              >
                <i className="fas fa-save" />
                Guardar
              </button>
              <button
                type="button"
                className="p-2 px-4 text-sm text-white transition bg-blue-600 border rounded-md md:hover:shadow-2xl md:hover:scale-105"
                id="printButton"
              >
                <i className="fas fa-print" />
                Imprimir
              </button>
            </fieldset> */}
          </form>
        </section>
      </div>
    </>
  );
}

export default Order;
