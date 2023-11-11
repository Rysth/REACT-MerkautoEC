import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import TextArea from '../../components/Forms/TextArea/TextArea';
import Input from '../../components/Forms/Input/Input';
import Checkbox from '../../components/Forms/Checkbox/Checkbox';
import AutoImage from '../../assets/images/auto/auto.png';

function Order() {
  const [actualDate, setActualDate] = useState();
  const { register, handleSubmit } = useForm();

  const { equipmentFields } = useSelector((store) => store.equipment);

  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const getFieldsData = (data, prefix) => {
    const fieldsData = Object.keys(data).reduce((acc, key) => {
      if (key.startsWith(prefix) && data[key]) {
        acc[key] = data[key];
      }
      return acc;
    }, {});
    return fieldsData;
  };

  const onSubmit = (data) => {
    const clientData = getFieldsData(data, 'cl_');
    const vehicleData = getFieldsData(data, 'v_');
    const workData = getFieldsData(data, 't_');

    const selectedEquipment = equipmentFields
      .filter((equipment) => data[`e_${equipment.name}`]) // Check if the checkbox is checked
      .map((equipment) => equipment);

    console.log({
      cliente: clientData,
      vehiculo: vehicleData,
      trabajos: workData,
      equipamento: selectedEquipment,
    });
  };

  useEffect(() => {
    setActualDate(getCurrentDate);
  }, [equipmentFields]);

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
            <fieldset className="grid gap-8 md:gap-12 sm:grid-cols-2">
              {/* Datos del Cliente */}
              <ul className="grid gap-2 p-0 list-none">
                <li className="h-10 text-center sm:text-left">
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
              {/* Datos del Vehículo */}
              <ul className="grid gap-2 p-0 list-none">
                <li className="h-10 text-center sm:text-left">
                  <h2 className="text-base font-bold md:text-lg">
                    Datos del Vehículo
                  </h2>
                </li>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Placa"
                    name="v_placa"
                    id="v_placa"
                    complement="uppercase"
                    method={register}
                  />
                  <Input
                    label="Clave"
                    name="v_clave"
                    id="v_clave"
                    method={register}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Marca"
                    name="v_marca"
                    id="v_marca"
                    method={register}
                  />
                  <Input
                    label="Color"
                    name="v_color"
                    id="v_color"
                    type="color"
                    method={register}
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <Input
                    label="Modelo"
                    name="v_modelo"
                    id="v_modelo"
                    method={register}
                  />
                  <Input
                    label="Año"
                    name="v_anio"
                    id="v_anio"
                    type="number"
                    method={register}
                  />
                  <Input
                    label="Chasis"
                    name="v_chasis"
                    id="v_chasis"
                    method={register}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Motor"
                    name="v_motor"
                    id="v_motor"
                    method={register}
                  />
                  <Input label="O/C" name="v_oc" id="v_oc" method={register} />
                </div>
                <Input
                  label="Fecha Entrega"
                  name="v_fecha_entrega"
                  id="v_fecha_entrega"
                  type="datetime-local"
                  method={register}
                  complement="grid grid-cols-[6rem_1fr]"
                />
                <Input
                  label="Kilometraje"
                  name="v_kilometraje"
                  id="v_kilometraje"
                  type="number"
                  method={register}
                />
                <Input
                  label="Detalles"
                  name="v_detalle"
                  id="v_detalle"
                  method={register}
                />
              </ul>
            </fieldset>
            <TextArea
              name="t_mecanica"
              label="Trabajos de Mecánica / Electricidad / Aire Acondicionado"
              method={register}
            />
            <TextArea
              name="t_pintura"
              label="Trabajos de Pintura"
              method={register}
            />
            <fieldset className="grid gap-10 mt-5 outline-none sm:grid-cols-[65%_1fr]">
              <div>
                <header className="mb-3 text-center">
                  <h2 className="text-base font-bold md:text-lg">
                    Equipamento del Auto
                  </h2>
                </header>
                <div className="grid grid-cols-2 mt-5 gap-x-3 sm:grid-cols-3">
                  {equipmentFields.map((equipment, index) => (
                    <Checkbox
                      key={equipment.id}
                      id={equipment.id}
                      name={equipment.name}
                      method={register}
                    />
                  ))}
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

            {/* 
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
             */}
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
            </fieldset>
          </form>
        </section>
      </div>
    </>
  );
}

export default Order;
