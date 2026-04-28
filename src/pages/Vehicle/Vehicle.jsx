import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Forms/Input/Input';
import Accordion from '../../components/Accordion/Accordion';
import { useVehicleStore } from '../../stores/useVehicleStore';
import { useOrderStore } from '../../stores/useOrderStore';

function Vehicle() {
	const { register } = useForm();
	const [loading, setLoading] = useState(false);
	const [expandedIndex, setExpandedIndex] = useState(null);
	const selectedVehicle = useVehicleStore((store) => store.selectedVehicle);
	const getVehicleByID = useVehicleStore((store) => store.getVehicleByID);
	const setDefaultValue = useVehicleStore((store) => store.setDefaultValue);
	const orderArray = useOrderStore((store) => store.orderArray);
	const [vehicleOrders, setVehicleOrders] = useState([]);

	const checkVehicleSubmit = async () => {
		const vehicleData = document.querySelector('#f_placa').value;
		setLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		getVehicleByID(vehicleData);
		setLoading(false);
	};

	const changeAccordionVision = (index) => {
		setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	useEffect(() => {
		if (selectedVehicle.placa) {
			setVehicleOrders(
				orderArray.filter(
					(order) =>
						// eslint-disable-next-line
						order.vehiculo.placa.toUpperCase() === selectedVehicle.placa.toUpperCase(),
				),
			);
		} else {
			setVehicleOrders([]);
		}
	}, [selectedVehicle, orderArray]);

	useEffect(() => {
		setVehicleOrders([]);
		setDefaultValue();
	}, [setDefaultValue]);

	return (
		<div>
			{selectedVehicle && true}
			<Heading
				text='Control de Taller'
				element=''
			/>
			<section
				className={`container max-w-screen-lg p-4 mx-auto border min-h-[550px] ${
					loading ? 'bg-gray-300 grayscale pointer-events-none' : ''
				}`}
			>
				<ul className='grid gap-2 p-0 list-none print:hidden'>
					<li className='flex flex-col w-full gap-2 sm:items-center sm:flex-row'>
						<fieldset className='grow'>
							<Input
								label='Placa'
								name='f_placa'
								id='f_placa'
								complement='w-full uppercase'
								method={register}
							/>
						</fieldset>
						<fieldset className='flex justify-end sm:justify-center print:hidden'>
							<button
								type='button'
								onClick={checkVehicleSubmit}
								className='flex items-center gap-1 p-1 px-4 text-sm text-white transition bg-blue-700 border rounded-md md:hover:shadow-2xl md:hover:scale-105'
								id='submit'
							>
								<i className='fas fa-search' />
								Consultar
							</button>
						</fieldset>
					</li>
				</ul>
				<div className='grid gap-5 mt-8'>
					<div className='grid grid-cols-2 gap-5 mt-2 sm:grid-cols-4'>
						<div className='p-2 text-center border rounded-md sm:text-left'>
							<h4 className='text-lg font-semibold'>Placa:</h4>
							<p className='text-xl font-bold text-blue-700 uppercase truncate text-ellipsis'>
								{selectedVehicle.placa ? selectedVehicle.placa : '----'}
							</p>
						</div>
						<div className='p-2 text-center border rounded-md sm:text-left'>
							<h4 className='text-lg font-semibold'>Marca:</h4>
							<p className='text-xl font-bold text-blue-700 capitalize truncate text-ellipsis'>
								{selectedVehicle.marca ? selectedVehicle.marca : '----'}
							</p>
						</div>
						<div className='p-2 text-center border rounded-md sm:text-left'>
							<h4 className='text-lg font-semibold'>Modelo:</h4>
							<p className='text-xl font-bold text-blue-700 capitalize truncate text-ellipsis'>
								{selectedVehicle.modelo ? selectedVehicle.modelo : '----'}
							</p>
						</div>
						<div className='p-2 text-center border rounded-md sm:text-left'>
							<h4 className='text-lg font-semibold'>Año:</h4>
							<p className='text-2xl font-bold text-blue-700 capitalize truncate text-ellipsis'>
								{selectedVehicle.anio ? selectedVehicle.anio : '----'}
							</p>
						</div>
					</div>
				</div>
				<header className='mt-3 text-center sm:text-left'>
					<h3 className='text-xl font-bold '>Historial de Ordenes</h3>
				</header>
				<div className='grid mt-8 overflow-auto'>
					{vehicleOrders.map((order, index) => (
						<Accordion
							key={order.id}
							codigo={order.id}
							index={index}
							expandedIndex={expandedIndex}
							toggle={changeAccordionVision}
							date={order.fecha}
							order={order}
						/>
					))}
				</div>
			</section>
		</div>
	);
}

export default Vehicle;
