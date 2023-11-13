import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Forms/Input/Input';
import LoginPicture from '../../assets/images/auto/login.jpg';
import { changeActiveStatus } from '../../redux/slices/loginDataSlice';

function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const onSubmit = (data) => {
    dispatch(changeActiveStatus(data)).then((response) => {
      if (response.payload.active) {
        navigator('/orden');
      }
    });
  };

  return (
    <section className="container max-w-screen-lg mx-auto border">
      <div className="grid sm:grid-cols-[60%_1fr] p-4 sm:p-0 relative h-[550px] sm:h-[600px]">
        <picture className="absolute inset-0 bg-black -z-10 sm:z-0 sm:relative">
          <img
            src={LoginPicture}
            alt="Repairing cars"
            className="absolute top-0 left-0 object-cover w-full h-full pointer-events-none grayscale"
          />
        </picture>
        <div className="flex flex-col justify-center p-8 bg-white sm:p-4">
          <form
            action="#"
            className="flex flex-col justify-center gap-10 p-4 md:p-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <fieldset className="text-center">
              <h2 className="text-4xl font-bold lg:text-5xl">Iniciar Sesión</h2>
            </fieldset>
            <ul className="grid gap-5 p-0 list-none">
              <Input
                label="Correo Electrónico"
                name="email"
                id="email"
                type="email"
                complement="grid w-full"
                method={register}
              />
              <Input
                label="Contraseña"
                name="password"
                id="password"
                type="password"
                complement="grid w-full"
                method={register}
              />
              <li className="flex justify-center gap-2 print:hidden">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 p-2 px-4 text-sm text-white transition bg-blue-600 border rounded-md md:hover:shadow-2xl md:hover:scale-105"
                  id="submit"
                >
                  Ingresar
                  <i className="fas fa-key" />
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
