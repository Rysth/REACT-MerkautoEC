import PropTypes from 'prop-types';

/* eslint-disable */
function TextArea({ name, label, method }) {
	return (
		<fieldset className='w-full mt-5 text-center'>
			<header className='mb-3 text-center'>
				<h2 className='text-base font-bold md:text-lg'>{label}</h2>
			</header>
			<textarea
				{...method(name)}
				className='w-full resize-none textarea textarea-bordered'
				rows={8}
			/>
		</fieldset>
	);
}

TextArea.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	method: PropTypes.func.isRequired,
};

export default TextArea;
