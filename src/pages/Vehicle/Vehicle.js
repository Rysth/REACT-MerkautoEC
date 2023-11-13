import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Forms/Input/Input';

function Vehicle() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    NotificationManager.info('Consultando..', 'Información');
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    NotificationManager.success('¡Vehículo Encontrado!', 'Exíto');
    NotificationManager.error('¡Vehículo no Encontrado!', 'Fallo');
    setLoading(false);
  };

  const onSubmit = (data) => {
    fetchData();
    console.log(data.f_placa);
  };

  return (
    <div>
      <Heading text="Historial Vehícular" />
      <NotificationContainer />
      <section
        className={`container max-w-screen-lg p-4 mx-auto border  ${
          loading ? 'bg-gray-300 grayscale' : ''
        }`}
      >
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <ul className="grid gap-2 p-0 list-none">
            <li className="h-10 text-center sm:text-left">
              <h2 className="text-base font-bold md:text-lg">Formulario</h2>
            </li>
            <li className="flex flex-col w-full gap-2 sm:items-center sm:flex-row">
              <fieldset className="grow">
                <Input
                  label="Placa"
                  name="f_placa"
                  id="f_placa"
                  complement="w-full"
                  method={register}
                />
              </fieldset>
              <fieldset className="flex justify-end sm:justify-center print:hidden">
                <button
                  type="submit"
                  className="flex items-center gap-1 p-1 px-4 text-sm text-white transition bg-blue-600 border rounded-md md:hover:shadow-2xl md:hover:scale-105"
                  id="submit"
                >
                  <i className="fas fa-search" />
                  Consultar
                </button>
              </fieldset>
            </li>
          </ul>
        </form>
        <div className="grid gap-5 mt-8">
          <header className="text-center sm:text-left">
            <h3 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Vehículo
            </h3>
          </header>
          <div className="grid grid-cols-2 gap-5 mt-2 sm:grid-cols-4">
            <div className="p-2 text-center border rounded-md sm:text-left">
              <h4 className="text-lg font-semibold">Placa:</h4>
              <p className="text-2xl font-bold text-blue-600 uppercase rounded-md md:text-3xl">
                GJS-2050
              </p>
            </div>
            <div className="p-2 text-center border rounded-md sm:text-left">
              <h4 className="text-lg font-semibold">Marca:</h4>
              <p className="text-2xl font-bold text-blue-600 capitalize rounded-md md:text-3xl">
                Toyota
              </p>
            </div>
            <div className="p-2 text-center border rounded-md sm:text-left">
              <h4 className="text-lg font-semibold">Modelo:</h4>
              <p className="text-2xl font-bold text-blue-600 capitalize rounded-md md:text-3xl">
                Rush
              </p>
            </div>
            <div className="p-2 text-center border rounded-md sm:text-left">
              <h4 className="text-lg font-semibold">Año:</h4>
              <p className="text-2xl font-bold text-blue-600 capitalize rounded-md md:text-3xl">
                2009
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Vehicle;
