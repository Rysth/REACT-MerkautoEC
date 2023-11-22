import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Forms/Input/Input';
import LoginPicture from '../../assets/images/auto/login.jpg';
import { changeActiveStatus } from '../../redux/slices/loginDataSlice';
import BrandImage from '../../assets/images/brand/logo_cofic.png';

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

  useEffect(() => {}, [dispatch]);

  return (
    <section className="fixed inset-0">
      <div className="grid sm:grid-cols-[1fr_1fr] md:grid-cols-[60%_1fr] lg:grid-cols-[65%_1fr] p-4 sm:p-0 h-full sm:relative">
        <picture className="absolute inset-0 bg-black sm:relative -z-10 sm:z-0">
          <img
            src={LoginPicture}
            alt="Repairing cars"
            className="object-cover w-full h-full pointer-events-none grayscale"
          />
        </picture>
        <div className="relative flex flex-col justify-center p-6 bg-white sm:p-4 rounded-xl sm:rounded-none max-w-[500px] min-w-[340px] sm:min-w-min sm:max-w-none mx-auto">
          <form
            action="#"
            className="flex flex-col justify-center gap-10 p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <fieldset className="mb-3 text-center">
              <h2 className="text-4xl font-bold lg:text-6xl">Iniciar Sesión</h2>
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
                  className="flex items-center gap-1.5 p-2 px-4 text-sm text-white transition bg-blue-700 border rounded-md md:hover:shadow-2xl md:hover:scale-105"
                  id="submit"
                >
                  Iniciar Sesión
                  <i className="fas fa-key" />
                </button>
              </li>
            </ul>
          </form>
          <footer className="absolute bottom-0 right-0 flex justify-between w-full p-5 mt-auto">
            <div className="flex items-center justify-end w-full">
              <h3 className="text-xs font-semibold pointer-events-none">
                Powered by
              </h3>
              <a
                href="https://www.asvesot.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Asvesot website"
              >
                <img src={BrandImage} alt="" className="w-28" />
              </a>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}

export default Login;
