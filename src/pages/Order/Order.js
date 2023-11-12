import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import TextArea from '../../components/Forms/TextArea/TextArea';
import Input from '../../components/Forms/Input/Input';
import Checkbox from '../../components/Forms/Checkbox/Checkbox';
import Auto from '../../components/Auto/Auto';
import Heading from '../../components/Heading/Heading';

function Order() {
  const { register, handleSubmit, reset } = useForm();

  const { equipmentFields } = useSelector((store) => store.equipment);

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

    NotificationManager.success('La orden se generó correctamente.', 'Exito');

    console.log({
      cliente: clientData,
      vehiculo: vehicleData,
      trabajos: workData,
      equipamento: selectedEquipment,
    });
    reset();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div>
        <Heading text="Orden de Recepción" />
      </div>
      <div>
        {/* eslint-disable */}
        <section className="container max-w-screen-lg p-4 mx-auto border">
          <NotificationContainer />
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
              <Auto register={register} />
            </fieldset>
            <fieldset className="w-full mt-10 text-center">
              <header className="text-center">
                <h2 className="text-sm font-bold">
                  Autorizo a la empresa MerkautoEC a realizar pruebas de mi
                  vehículo en la vía pública.
                </h2>
              </header>
              <div className="grid gap-10 pt-20 pb-12 sm:grid-cols-2">
                <div className="grid justify-center gap-2">
                  <hr className="inline-block border border-gray-300 min-w-[13rem] sm:w-80" />
                  <p className="text-sm">Firma del Cliente</p>
                </div>
                <div className="grid justify-center gap-2">
                  <hr className="inline-block border border-gray-300 min-w-[13rem] sm:w-80" />
                  <p className="text-sm">Firma del Responsable</p>
                </div>
              </div>
            </fieldset>
            <fieldset className="flex justify-center print:hidden">
              <button
                type="submit"
                className="flex items-center gap-2 p-2 px-4 text-sm text-white transition bg-green-600 border rounded-md md:hover:shadow-2xl md:hover:scale-105"
                id="submit"
              >
                <i className="fas fa-save" />
                Guardar
              </button>
              <button
                type="button"
                className="flex items-center gap-2 p-2 px-4 text-sm text-white transition bg-blue-600 border rounded-md md:hover:shadow-2xl md:hover:scale-105"
                id="printButton"
                onClick={handlePrint}
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
