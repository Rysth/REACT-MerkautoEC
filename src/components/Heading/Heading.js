import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Heading({ text }) {
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
    <section className="container max-w-screen-lg p-4 mx-auto border">
      <header className="flex flex-col items-center justify-between sm:flex-row">
        <h1 className="text-2xl font-bold sm:text-3xl">{text}</h1>
        <p className="flex items-center gap-1 text-sm font-bold">
          Fecha:
          <span id="actualDate">{actualDate}</span>
        </p>
      </header>
    </section>
  );
}

Heading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Heading;
