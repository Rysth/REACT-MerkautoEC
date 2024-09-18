import PropTypes from 'prop-types';

/* eslint-disable */
function Input({ label, name, id, type = 'text', complement = '', method = () => {}, errors, isRequired = true }) {
	return (
		<div>
			<label
				className={`gap-2 text-sm text-black w-full ${complement}`}
				htmlFor={id}
			>
				<div className='flex items-center justify-between'>
					<span className='font-semibold capitalize'>{label}:</span>
					{errors[name] && (
						<span className='text-white badge badge-sm badge-error'>Campo Requerido</span> // Display error message if present
					)}
				</div>
				<input
					type={type}
					{...method(name, { required: isRequired, message: `El campo es requerido.` })}
					id={id}
					className={`input input-bordered mt-2 w-full font-regular`}
				/>
			</label>
		</div>
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
