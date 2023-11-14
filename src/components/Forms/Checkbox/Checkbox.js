import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable */
function Checkbox({ id, name, method }) {
  return (
    <div className="flex items-center justify-between px-2 transition-colors rounded-md md:hover:bg-slate-200 active:bg-blue-400 md:active:bg-blue-300">
      <label
        htmlFor={`e_${id}`}
        className="w-full py-2 text-sm cursor-pointer select-none"
      >
        {name}
      </label>
      <input
        type="checkbox"
        {...method(`e_${id}`)}
        id={`e_${id}`}
        className="w-5 h-5 bg-black"
      />
    </div>
  );
}

Checkbox.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  method: PropTypes.func.isRequired,
};

export default Checkbox;
