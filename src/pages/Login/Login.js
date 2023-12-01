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
      </div>
    </section>
  );
}

export default Login;
