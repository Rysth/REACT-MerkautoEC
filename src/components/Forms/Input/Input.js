import PropTypes from 'prop-types';

/* eslint-disable */
function Input({
  label,
  name,
  id,
  type = 'text',
  complement = '',
  method = () => {},
  isRequired = true,
}) {
  return (
    <li>
      <label
        className={`flex items-center gap-2 text-sm ${complement}`}
        htmlFor={id}
      >
        <span className="font-semibold capitalize">{label}:</span>
        <input
          type={type}
          {...method(name)}
          id={id}
          className={`w-full p-1 px-2 text-sm bg-gray-100 border rounded-lg outline-none focus:border-gray-400 focus:bg-white ${
            label == 'Placa' || label == 'Orden' ? 'uppercase' : ''
          }`}
          required={isRequired}
        />
      </label>
    </li>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  method: PropTypes.func.isRequired,
};

export default Input;
