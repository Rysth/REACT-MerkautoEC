import LoginPicture from '../../assets/images/auto/login.jpg';

function Login() {
  return (
    <section className="container max-w-screen-lg mx-auto border">
      <div className="grid sm:grid-cols-[65%_1fr] ">
        <picture className="h-[600px] bg-black relative  ">
          <img
            src={LoginPicture}
            alt="Repairing cars"
            className="absolute top-0 left-0 object-cover w-full h-full pointer-events-none grayscale"
          />
        </picture>
      </div>
    </section>
  );
}

export default Login;
