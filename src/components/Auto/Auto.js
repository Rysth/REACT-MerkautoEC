import { useState } from 'react';

function Auto() {
  const [createdCircles, setCreatedCircles] = useState([]);

  const undoLastCircle = () => {
    if (createdCircles.length > 0) {
      const lastCircle = createdCircles.pop(); // Remove the last circle from the array
      const auto = document.querySelector('.auto');
      auto.removeChild(lastCircle); // Remove the circle from the container
    }
  };

  return (
    <fieldset class="grid gap-10 mt-5 outline-none sm:grid-cols-[65%_1fr]">
      <div>
        <header class="mb-3 text-center">
          <h2 class="text-base font-bold md:text-lg">Equipamento del Auto</h2>
        </header>
        <div
          class="grid grid-cols-2 mt-5 gap-x-3 sm:grid-cols-3"
          id="equipamento"
        ></div>
      </div>
      <div class="ml-auto">
        <header class="mb-3 text-center">
          <h2 class="text-base font-bold md:text-lg">Estado del Vehículo</h2>
        </header>
        <div class="flex mt-5 md:justify-end">
          <div
            class="inline-block w-6 h-6 mr-2 transition bg-red-600 border border-gray-700 rounded-full cursor-move sm:w-6 sm:h-6 md:hover:scale-110 md:active:scale-125 status-circle"
            draggable="true"
            data-status="Red"
          ></div>
          <div
            class="inline-block w-6 h-6 mr-2 transition bg-orange-500 border border-gray-700 rounded-full cursor-move status-circle sm:w-6 sm:h-6 md:hover:scale-110 md:active:scale-125"
            draggable="true"
            data-status="Orange"
          ></div>
          <div
            class="inline-block w-6 h-6 mr-2 transition bg-green-600 border border-gray-700 rounded-full cursor-move status-circle sm:w-6 sm:h-6 md:hover:scale-110 md:active:scale-125"
            draggable="true"
            data-status="Green"
          ></div>
        </div>
        <div
          class="relative mt-2 overflow-hidden border auto"
          id="auto-picture"
        >
          <img
            class="p-5 auto-image lg:max-h-[270px] mx-auto"
            alt="Automovil picture"
            id="auto-image"
          />
        </div>
        <div class="items-center justify-end gap-2 mt-3 content-actions">
          <li class="flex items-center justify-between gap-4">
            <label class="text-sm" for="v_combustible">
              Combustible:
            </label>
            <input
              type="range"
              min="0"
              max="100"
              name="v_combustible"
              id="v_combustible"
              class="w-full p-0.5 px-2 border focus:border-gray-500 rounded-md outline-none bg-gray-100 focus:bg-white text-sm"
            />
          </li>
          <button
            type="button"
            class="float-right px-3 py-2 mt-3 text-xs font-bold text-white transition bg-blue-700 rounded-md md:hover:scale-105 print:hidden"
            id="undoButton"
            onClick={undoLastCircle}
          >
            <i class="fas fa-undo"></i>
            Deshacer
          </button>

          <button
            type="button"
            class="hidden px-3 py-2 text-sm font-bold text-white transition bg-green-700 rounded-md md:hover:scale-105"
            id="downloadButton"
          >
            <i class="fas fa-download"></i>
            Descargar
          </button>
        </div>
      </div>
    </fieldset>
  );
}

export default Auto;
