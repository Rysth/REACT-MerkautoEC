function Order() {
  return (
    <section className="">
      <header>
        <h2 className="text-xl font-semibold sm:text-3xl lg:text-4xl">
          Ordenes
        </h2>
      </header>
      <div className="flex items-center gap-2 py-4 text-sm">
        <input
          type="text"
          aria-label="Orden/Placa searcher"
          className="flex-1 px-3 py-1.5 rounded-lg border focus:outline-none focus:border-gray-500"
          placeholder="Buscar..."
        />
        <button
          type="button"
          aria-label="Search button"
          className="btn btn-info"
        >
          Buscar
        </button>
      </div>
    </section>
  );
}

export default Order;
