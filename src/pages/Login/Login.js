import VehicleImage from '../../assets/images/vehicles/vehicle_1.jpg';

function Login() {
  return (
    <section className="w-full bg-white">
      <div className="grid grid-cols-2">
        <picture className="h-full">
          <img
            src={VehicleImage}
            alt="Portrait vehicle"
            className="object-cover w-full h-full max-h-screen "
          />
        </picture>
        <article className="flex flex-col items-center justify-center">
          <header>
            <h2 className="text-2xl font-bold sm:text-4xl md:text-5xl">
              Iniciar Sesión
            </h2>
          </header>
          <form className="grid gap-5 mt-5 text-sm sm:mt-10 w-60">
            <fieldset>
              <label
                htmlFor="email"
                className="relative grid gap-2 font-semibold"
              >
                Correo Electrónico:
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="flex-1 p-2 font-normal border rounded-lg focus:outline-none focus:border-gray-500"
                />
              </label>
            </fieldset>
            <fieldset>
              <label
                htmlFor="password"
                className="relative grid gap-2 font-semibold"
              >
                Contraseña
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="flex-1 p-2 font-normal border rounded-lg focus:outline-none focus:border-gray-500"
                />
              </label>
            </fieldset>
            <fieldset className="flex items-center justify-end gap-1 mt-auto">
              <button
                type="button"
                className="float-right w-full !p-2 btn btn-info"
              >
                Ingresar
              </button>
            </fieldset>
          </form>
        </article>
      </div>
    </section>
  );
}

export default Login;
