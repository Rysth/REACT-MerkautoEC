import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Heading({ text, element = null }) {
  const [actualDate, setActualDate] = useState();

  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    setActualDate(getCurrentDate);
  }, []);

  return (
    <section className="container max-w-screen-lg p-4 mx-auto border-t border-b-0 rounded-t-lg border-x">
      <header className="flex flex-col items-center justify-between sm:flex-row">
        <h1 className="flex flex-col items-center text-2xl font-bold sm:gap-3 sm:flex-row sm:text-3xl">
          {text}
          {element && (
            <span className="text-2xl font-bold text-blue-700 uppercase">{`#${element}`}</span>
          )}
        </h1>
        <p className="flex items-center gap-1 mt-3 text-sm font-bold sm:mt-0">
          Fecha:
          <span id="actualDate">{actualDate}</span>
        </p>
      </header>
    </section>
  );
}

Heading.propTypes = {
  text: PropTypes.string.isRequired,
  element: PropTypes.string.isRequired,
};

export default Heading;
