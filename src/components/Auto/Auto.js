import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AutoImage from '../../assets/images/auto/auto.png';
import Input from '../Forms/Input/Input';

function Auto({ register }) {
  const [createdCircles, setCreatedCircles] = useState([]);

  let initialX;
  let initialY;
  let activeCircle = null;
  let offsetX;
  let offsetY;

  const undoLastCircle = () => {
    if (createdCircles.length > 0) {
      const lastCircle = createdCircles.pop(); // Remove the last circle from the array
      const auto = document.querySelector('.auto');
      auto.removeChild(lastCircle); // Remove the circle from the container
    }
  };

  const dragCircle = (event) => {
    if (!activeCircle) return;

    const auto = document.querySelector('.auto');
    const rect = auto.getBoundingClientRect();
    const x = event.clientX - rect.left - offsetX;
    const y = event.clientY - rect.top - offsetY;

    const maxX = rect.width - activeCircle.offsetWidth;
    const maxY = rect.height - activeCircle.offsetHeight;

    const newX = Math.min(Math.max(0, x), maxX);
    const newY = Math.min(Math.max(0, y), maxY);

    activeCircle.style.left = `${newX}px`;
    activeCircle.style.top = `${newY}px`;
  };

  // Function to stop dragging
  const stopDrag = () => {
    activeCircle = null;
    document.removeEventListener('mousemove', dragCircle);
    document.removeEventListener('mouseup', stopDrag);

    // Remove the prevent-scroll class from the active circle
    if (activeCircle) {
      activeCircle.classList.remove('prevent-scroll');
    }
  };

  // Function to start dragging
  const startDrag = (event) => {
    activeCircle = event.target;
    offsetX = event.clientX - activeCircle.getBoundingClientRect().left;
    offsetY = event.clientY - activeCircle.getBoundingClientRect().top;

    document.addEventListener('mousemove', dragCircle);
    document.addEventListener('mouseup', stopDrag);

    // Add class to the active circle to prevent scrolling
    activeCircle.classList.add('prevent-scroll');
  };

  const dragCircleTouch = (event) => {
    if (!activeCircle) return;

    const auto = document.querySelector('.auto');
    const rect = auto.getBoundingClientRect();
    const touch = event.touches[0];
    const x = touch.clientX - rect.left - offsetX;
    const y = touch.clientY - rect.top - offsetY;

    const maxX = rect.width - activeCircle.offsetWidth;
    const maxY = rect.height - activeCircle.offsetHeight;

    const newX = Math.min(Math.max(0, x), maxX);
    const newY = Math.min(Math.max(0, y), maxY);

    activeCircle.style.left = `${newX}px`;
    activeCircle.style.top = `${newY}px`;
  };

  // Function to stop dragging on touch devices
  const stopDragTouch = () => {
    activeCircle = null;
    document.removeEventListener('touchmove', dragCircleTouch);
    document.removeEventListener('touchend', stopDragTouch);

    // Remove the prevent-scroll class from the active circle
    if (activeCircle) {
      activeCircle.classList.remove('prevent-scroll');
    }
  };

  // Function to start dragging on touch devices
  const startDragTouch = (event) => {
    activeCircle = event.target;
    const touch = event.touches[0];
    offsetX = touch.clientX - activeCircle.getBoundingClientRect().left;
    offsetY = touch.clientY - activeCircle.getBoundingClientRect().top;

    document.addEventListener('touchmove', dragCircleTouch);
    document.addEventListener('touchend', stopDragTouch);

    // Add class to the active circle to prevent scrolling
    activeCircle.classList.add('prevent-scroll');
  };

  function moveActualCircle(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const originalCircle = document.querySelector(
      `.status-circle.placed[data-status="${data}"]`,
    );
    if (originalCircle) {
      const auto = document.querySelector('.auto');
      const rect = auto.getBoundingClientRect();
      const x = event.clientX - rect.left - initialX;
      const y = event.clientY - rect.top - initialY;

      // Clone the original circle
      const newCircle = originalCircle.cloneNode(true);

      // Calculate the new position within the boundaries of .auto
      const maxX = rect.width - newCircle.offsetWidth;
      const maxY = rect.height - newCircle.offsetHeight;

      // Ensure the new position stays within the boundaries
      const newX = Math.min(Math.max(0, x), maxX);
      const newY = Math.min(Math.max(0, y), maxY);

      // Set the position for the new circle
      newCircle.classList.add('placed');
      newCircle.style.left = `${newX}px`;
      newCircle.style.top = `${newY}px`;

      // Make the new circle draggable
      newCircle.addEventListener('mousedown', startDrag);
      newCircle.addEventListener('touchstart', startDragTouch, {
        passive: true,
      });

      // Append the new circle to the container
      auto.removeChild(originalCircle); // Remove the existing circle
      auto.appendChild(newCircle);
    }
  }

  const dragStart = (event) => {
    const circle = event.target;
    initialX = event.clientX - circle.getBoundingClientRect().left;
    initialY = event.clientY - circle.getBoundingClientRect().top;
    event.dataTransfer.setData('text', circle.dataset.status);
  };

  const dragOver = (event) => {
    event.preventDefault();
  };

  const drop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const originalCircle = document.querySelector(
      `.status-circle[data-status="${data}"]`,
    );
    if (originalCircle) {
      const auto = document.querySelector('.auto');
      const rect = auto.getBoundingClientRect();
      const x = event.clientX - rect.left - initialX;
      const y = event.clientY - rect.top - initialY;

      // Clone the original circle
      const newCircle = originalCircle.cloneNode(true);

      // Calculate the new position within the boundaries of .auto
      const maxX = rect.width - newCircle.offsetWidth;
      const maxY = rect.height - newCircle.offsetHeight;

      // Ensure the new position stays within the boundaries
      const newX = Math.min(Math.max(0, x), maxX);
      const newY = Math.min(Math.max(0, y), maxY);

      // Set the position for the new circle
      newCircle.classList.add('placed');
      newCircle.style.left = `${newX}px`;
      newCircle.style.top = `${newY}px`;

      // Make the new circle draggable
      newCircle.addEventListener('mousedown', startDrag);
      newCircle.addEventListener('touchstart', startDragTouch, {
        passive: true,
      });

      // Append the new circle to the container
      newCircle.ondragstart = moveActualCircle;
      auto.appendChild(newCircle);

      // Add the newly created circle to the array
      setCreatedCircles((createdCircles) => [...createdCircles, newCircle]);
    }
  };

  const isMobileDevice = window.innerWidth < 768;

  const createNewCircleInside = (event) => {
    if (isMobileDevice) {
      const originalCircle = event.target;
      const auto = document.querySelector('.auto');

      // Create a new circle element
      const newCircle = originalCircle.cloneNode(true);

      // Set a default size and position inside the original circle
      newCircle.classList.add('placed');
      newCircle.style.left = '20px'; // Adjust the initial position as needed
      newCircle.style.top = '20px';

      // Make the new circle draggable
      newCircle.addEventListener('mousedown', startDrag);
      newCircle.addEventListener('touchstart', startDragTouch, {
        passive: true,
      });

      // Append the new circle inside the original circle
      newCircle.ondragstart = moveActualCircle;
      auto.appendChild(newCircle);

      // Add the newly created circle to the array
      setCreatedCircles((createdCircles) => [...createdCircles, newCircle]);
    }
  };

  /* eslint-disable */
  useEffect(() => {
    // Add event listeners to make the circles draggable on both desktop and mobile
    document
      .querySelectorAll('.status-circle[data-status]')
      .forEach((circle) => {
        circle.addEventListener('mousedown', startDrag);
        circle.addEventListener('touchstart', startDragTouch, {
          passive: true,
        });

        if (isMobileDevice) {
          circle.addEventListener('click', createNewCircleInside);
        }
      });
  }, []);
  /* eslint-enable */

  return (
    <div className="ml-auto">
      <header className="text-center ">
        <h2 className="text-base font-bold md:text-lg">Estado del Vehículo</h2>
      </header>
      <div className="flex mt-2 md:justify-end">
        <div
          className="inline-block w-6 h-6 mr-2 transition bg-red-600 border border-gray-700 rounded-full cursor-move sm:w-6 sm:h-6 md:hover:scale-110 md:active:scale-125 status-circle"
          draggable="true"
          data-status="Red"
          onDragStart={dragStart}
        />
        <div
          className="inline-block w-6 h-6 mr-2 transition bg-orange-500 border border-gray-700 rounded-full cursor-move status-circle sm:w-6 sm:h-6 md:hover:scale-110 md:active:scale-125"
          draggable="true"
          data-status="Orange"
          onDragStart={dragStart}
        />
        <div
          className="inline-block w-6 h-6 mr-2 transition bg-green-600 border border-gray-700 rounded-full cursor-move status-circle sm:w-6 sm:h-6 md:hover:scale-110 md:active:scale-125"
          draggable="true"
          data-status="Green"
          onDragStart={dragStart}
        />
      </div>
      <div
        className="relative mt-2 overflow-hidden border rounded-lg auto"
        id="auto-picture"
      >
        <img
          className="p-5 auto-image lg:max-h-[270px] mx-auto"
          alt="Automovil"
          src={AutoImage}
          id="auto-image"
          onDragOver={dragOver}
          onDrop={drop}
        />
      </div>
      <div className="items-center justify-end gap-2 mt-3 content-actions">
        <ul className="list-none">
          <Input
            label="Combustible"
            name="v_combustible"
            id="v_combustible"
            type="range"
            method={register}
          />
        </ul>
        <button
          type="button"
          className="flex items-center float-right gap-1 px-3 py-2 mt-3 text-sm font-bold text-white transition bg-blue-700 rounded-md md:hover:scale-105 print:hidden"
          id="undoButton"
          onClick={undoLastCircle}
        >
          <i className="fas fa-undo" />
          Deshacer
        </button>
      </div>
    </div>
  );
}

Auto.propTypes = {
  register: PropTypes.func.isRequired,
};

export default Auto;
