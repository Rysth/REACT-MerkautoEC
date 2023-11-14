import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';

/* eslint-disable */
function Accordion({ index, expandedIndex, toggle, title, text }) {
  const isExpanded = index === expandedIndex;

  return (
    <div className="p-4 bg-yellow-300">
      <header className="flex items-center justify-between">
        <h3 className="text-xl sm:text-3xl lg:text-4xl">{title}</h3>
        <button type="button" onClick={() => toggle(index)}>
          {isExpanded ? 'Hide' : 'Show'}
        </button>
      </header>
      <Collapse isOpened={isExpanded}>
        <p className="text-sm sm:text-base">{text}</p>
      </Collapse>
    </div>
  );
}

Accordion.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Accordion;
