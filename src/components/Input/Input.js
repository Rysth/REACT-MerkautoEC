import PropTypes from 'prop-types';

/* eslint-disable */
function Input({ label, name, id, type = 'text', complement = '' }) {
  return (
    <li>
      <label
        className={`flex items-center gap-2 text-sm ${complement}`}
        htmlFor={id}
      >
        <span className="font-semibold">{label}:</span>
        <input
          type={type}
          name={name}
          id={id}
          className="w-full p-1 px-2 text-sm bg-gray-100 border rounded-md outline-none focus:border-gray-500 focus:bg-white"
          required
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
};

export default Input;
