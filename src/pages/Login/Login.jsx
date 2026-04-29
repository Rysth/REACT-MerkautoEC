import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import LoginPicture from '../../assets/images/auto/login.jpg';
import CoficImage from '../../assets/images/brand/logo_cofic.png';
import RysthImage from '../../assets/images/brand/logo_rysthdesign.png';
import Input from '../../components/Forms/Input/Input';
import useAuthStore from '../../stores/useAuthStore';

const SAVED_CREDENTIALS_KEY = 'saved_credentials';

function Login() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const login = useAuthStore((store) => store.login);

  useEffect(() => {
    const saved = localStorage.getItem(SAVED_CREDENTIALS_KEY);
    if (saved) {
      const { email, password } = JSON.parse(saved);
      setValue('email', email);
      setValue('password', password);
      setValue('rememberMe', true);
      return;
    }

    setValue('rememberMe', false);
  }, [setValue]);

  const onSubmit = ({ rememberMe, ...data }) => {
    if (rememberMe) {
      localStorage.setItem(
        SAVED_CREDENTIALS_KEY,
        JSON.stringify({ email: data.email, password: data.password }),
      );
    } else {
      localStorage.removeItem(SAVED_CREDENTIALS_KEY);
    }

    login(data);
  };

  return (
    <section className="fixed inset-0 overflow-hidden bg-slate-950">
      <div className="relative grid h-full sm:grid-cols-[minmax(0,1.15fr)_minmax(420px,540px)]">
        <picture className="absolute inset-0 sm:relative sm:inset-auto -z-10 sm:z-0 bg-slate-950">
          <img
            src={LoginPicture}
            alt="Repairing cars"
            className="object-cover w-full h-full pointer-events-none grayscale brightness-[0.35] sm:brightness-50 md:brightness-75"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent" />
        </picture>
        <div className="relative flex h-full w-full flex-col justify-center px-5 py-8 sm:px-10 lg:px-14">
          <div className="mx-auto flex w-full max-w-140 flex-col justify-center rounded-3xl bg-white/95 p-6 shadow-2xl backdrop-blur sm:p-8 lg:p-10">
            <div className="mb-8 space-y-3">
              <p className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Acceso seguro
              </p>
              <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Iniciar Sesión
              </h2>
              <p className="max-w-md text-sm leading-6 text-slate-600 sm:text-base">
                Ingresa con tu cuenta autorizada para consultar órdenes, vehículos y servicios.
              </p>
            </div>

          <form
            action="#"
            className="flex flex-col justify-center gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <fieldset className="grid gap-5">
              <Input
                label="Correo Electrónico"
                name="email"
                id="email"
                type="email"
                complement="grid w-full"
                method={register}
                errors={errors}
              />
              <Input
                label="Contraseña"
                name="password"
                id="password"
                type="password"
                complement="grid w-full"
                errors={errors}
                method={register}
              />
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                <input
                  type="checkbox"
                  id="rememberMe"
                  {...register('rememberMe')}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="rememberMe" className="cursor-pointer select-none text-sm text-slate-700">
                  Recordar credenciales
                </label>
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="btn btn-primary w-full rounded-xl border-0 bg-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition-transform hover:-translate-y-0.5 hover:bg-emerald-600"
                  id="submit"
                >
                  Iniciar Sesión
                  <i className="fas fa-key" />
                </button>
              </div>
            </fieldset>
          </form>

          <footer className="mt-8 flex items-center justify-between gap-6 border-t border-slate-200 pt-6">
            <a
              href="https://www.asvesot.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Asvesot Website"
              className="transition-transform hover:scale-105"
            >
              <img src={CoficImage} alt="Cofic logo" className="h-10 w-auto sm:h-12" />
            </a>
            <a
              href="https://rysthdesign.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rysthcraft Portfolio Website"
              className="transition-transform hover:scale-105"
            >
              <img src={RysthImage} alt="Rysthcraft logo" className="h-10 w-auto sm:h-12" />
            </a>
          </footer>
        </div>
        </div>
      </div>
    </section>
  );
}

export default Login;