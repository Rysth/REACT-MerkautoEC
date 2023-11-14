import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';

/* eslint-disable */
function Accordion({ index, expandedIndex, toggle, date, text }) {
  const isExpanded = index === expandedIndex;

  return (
    <div
      className="p-4 border rounded-md cursor-pointer"
      onClick={() => toggle(index)}
    >
      <header className="flex items-center justify-between">
        <h3 className="font-semibold">
          {`${index + 1}) Fecha: `}
          {date}
        </h3>
        <button type="button">{isExpanded ? 'Hide' : 'Show'}</button>
      </header>
      <Collapse isOpened={isExpanded}>
        <p className="py-5 text-sm sm:text-base">{text}</p>
      </Collapse>
    </div>
  );
}

Accordion.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Accordion;
