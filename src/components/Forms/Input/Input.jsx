import PropTypes from 'prop-types';

/* eslint-disable */
function Input({ label, name, id, type = 'text', complement = '', method = () => {}, errors, isRequired = true }) {
	return (
		<li>
			<label
				className={`gap-2 text-sm text-black min-w-72 ${complement}`}
				htmlFor={id}
			>
				<div className='flex items-center justify-between'>
					<span className='font-semibold capitalize'>{label}:</span>
					{errors[name] && (
						<span className='text-white badge badge-sm badge-error'>El campo es requerido</span> // Display error message if present
					)}
				</div>
				<input
					type={type}
					{...method(name, { required: isRequired, message: `El campo es requerido.` })}
					id={id}
					className={`input input-bordered mt-2 w-full`}
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
