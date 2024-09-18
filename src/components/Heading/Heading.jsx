import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { checkCedulaExists } from '../../redux/slices/orderDataSlice';

function Heading({ text }) {
	const [actualDate, setActualDate] = useState();
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const getCurrentDate = () => {
		const date = new Date();
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
	};

	useEffect(() => {
		setActualDate(getCurrentDate());
	}, []);

	// Function to handle Cédula/RUC checking
	const handleCedulaCheck = async (data) => {
		data.servicio = 'TRXCONCLI';
		dispatch(checkCedulaExists(data));
	};

	return (
		<section className='container max-w-screen-lg p-4 mx-auto border-t border-b-0 rounded-t-lg border-x'>
			<header className='flex flex-col items-center justify-between sm:flex-row'>
				<h1 className='flex flex-col items-center text-2xl font-bold sm:gap-3 sm:flex-row sm:text-3xl'>
					{text}
				</h1>
				<p className='flex items-center gap-1 mt-3 text-sm font-bold sm:mt-0'>
					Fecha:
					<span id='actualDate'>{actualDate}</span>
				</p>
			</header>
			<main className='hidden mt-4'>
				<form
					onSubmit={handleSubmit(handleCedulaCheck)}
					className='list-none'
				>
					<fieldset className='flex flex-col justify-between gap-4 md:items-end md:flex-row'>
						<label
							className='flex-1 gap-2 text-sm text-black min-w-72'
							htmlFor='consulta_identificacion'
						>
							<div className='flex items-center justify-between'>
								<span className='font-semibold capitalize'>Consulta por Identificación:</span>
								{errors['consulta_identificacion'] && (
									<span className='text-white badge badge-sm badge-error'>El campo es requerido</span>
								)}
							</div>
							<input
								type='text'
								{...register('consulta_identificacion', {
									required: true,
									message: `El campo es requerido.`,
								})}
								id='consulta_identificacion'
								className={`input input-bordered mt-2 w-full`}
							/>
						</label>
						<button
							type='submit'
							className='h-full btn btn-secondary'
						>
							Consultar
						</button>
					</fieldset>
				</form>
			</main>
		</section>
	);
}

Heading.propTypes = {
	text: PropTypes.string.isRequired,
	element: PropTypes.string,
};

export default Heading;
