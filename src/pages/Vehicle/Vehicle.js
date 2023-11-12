import { useForm } from 'react-hook-form';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Forms/Input/Input';

function Vehicle() {
  const { register } = useForm();

  return (
    <div>
      <Heading text="Historial Vehícular" />
      <section className="container max-w-screen-lg p-4 mx-auto border">
        <form action="">
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
      </section>
    </div>
  );
}

export default Vehicle;
