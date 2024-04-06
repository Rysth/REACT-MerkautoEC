import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import TextArea from '../../components/Forms/TextArea/TextArea';
import Input from '../../components/Forms/Input/Input';
import Checkbox from '../../components/Forms/Checkbox/Checkbox';
import Auto from '../../components/Auto/Auto';
import Heading from '../../components/Heading/Heading';
import { orderDataActions, sendXmlRequest } from '../../redux/slices/orderDataSlice';
import { vehicleDataActions } from '../../redux/slices/vehicleDataSlice';

function Order() {
	const [documentTitle, setDocumentTitle] = useState(document.title);
	const [loading, setLoading] = useState(false);
	const { selectedOrder, orderArray } = useSelector((store) => store.orders);
	const [actualID, setActualID] = useState('');
	const [actualPlaca, setActualPlaca] = useState('');
	/* eslint-disable */
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm();
	/* eslint-enable */
	const { equipmentFields } = useSelector((store) => store.equipment);

	/* eslint-disable */
	const getFieldsData = (data, prefix) => {
		return Object.fromEntries(
			Object.entries(data)
				.filter(([key, value]) => key.startsWith(prefix) && value)
				.map(([key, value]) => [key.replace(`${prefix}`, ''), value]),
		);
	};
	/* eslint-enable */
	const dispatch = useDispatch();
	const onSubmit = async (data) => {
		const actualDate = document.querySelector('#actualDate').innerText;
		const clientData = getFieldsData(data, 'cl_');
		const vehicleData = getFieldsData(data, 'v_');
		const workData = getFieldsData(data, 't_');

		const selectedEquipment = equipmentFields
			.filter((equipment) => data[`e_${equipment.id}`])
			.map((equipment) => equipment.id);

		vehicleData.placa = vehicleData.placa.toUpperCase();
		setActualPlaca(vehicleData.placa);

		const JSONDATA = {
			id: actualID,
			fecha: actualDate,
			cliente: clientData,
			vehiculo: vehicleData,
			trabajos: workData,
			equipamento: selectedEquipment,
		};

		JSONDATA.servicio = 'TRXINGORD';

		setLoading(true);
		console.log(JSONDATA);
		dispatch(sendXmlRequest(JSONDATA));
		dispatch(vehicleDataActions.addNewVehicle(vehicleData));
		setLoading(false);
		reset();
	};

	useEffect(() => {
		if (selectedOrder) {
			if (!selectedOrder.id) {
				reset();
				return;
			}

			const fieldPrefixes = {
				cliente: 'cl_',
				vehiculo: 'v_',
				trabajos: 't_',
				equipamento: 'e_',
			};
			Object.entries(selectedOrder).forEach(([key, value]) => {
				if (key in fieldPrefixes) {
					const prefix = fieldPrefixes[key];
					if (typeof value === 'object') {
						Object.entries(value).forEach(([nestedKey, nestedValue]) => {
							if (prefix === fieldPrefixes.equipamento) {
								setValue(`${prefix}${nestedValue}`, true);
								return;
							}
							setValue(`${prefix}${nestedKey}`, nestedValue);
						});
					} else {
						setValue(prefix, value);
					}
				}
			});
		}
	}, [selectedOrder, setValue, reset]);

	useEffect(() => {
		if (orderArray.length > 0) {
			// Calculate the next incremental order number
			const nextOrderNumber = orderArray.length + 1;

			// Format the order number with leading zeros
			const formattedNumber = nextOrderNumber.toString().padStart(7, '0');

			// Set the actualID
			setActualID(formattedNumber);
		} else {
			// If there are no existing orders, set a default order number
			setActualID('0000001');
		}
	}, [orderArray]);

	return (
		<>
			<Heading
				text='Orden de Recepción'
				element={actualID}
			/>
			<div>
				<section
					className={`container max-w-screen-lg p-4 mx-auto border min-h-[550px]   ${
						loading ? 'bg-gray-300 grayscale pointer-events-none' : ''
					}`}
				>
					<form
						action='#'
						id='form'
						onSubmit={handleSubmit(onSubmit)}
						className=''
					>
						<fieldset className='grid gap-8 gap-12 sm:grid-cols-2'>
							{/* Datos del Cliente */}
							<ul className='flex flex-col gap-2'>
								<li className='h-8 text-center sm:text-left'>
									<h2 className='text-lg font-bold'>Datos del Cliente</h2>
								</li>
								<fieldset className='grid grid-cols-2 gap-4'>
									<Input
										label='Cédula/RUC'
										name='cl_identificacion'
										id='cl_identificacion'
										method={register}
										errors={errors}
									/>
									<Input
										label='Nombre'
										name='cl_nombre'
										id='cl_nombre'
										method={register}
										errors={errors}
									/>
								</fieldset>
								<fieldset className='grid grid-cols-2 gap-4'>
									<Input
										label='Celular'
										name='cl_celular'
										id='cl_celular'
										type='tel'
										method={register}
										errors={errors}
									/>
									<Input
										label='Dirección'
										name='cl_direccion'
										id='cl_direccion'
										method={register}
										errors={errors}
										isRequired={false}
									/>
								</fieldset>
								<fieldset className='grid grid-cols-2 gap-4'>
									<Input
										label='Recibido por'
										name='cl_recepcion'
										id='cl_recepcion'
										complement=''
										method={register}
										errors={errors}
										isRequired={false}
									/>
									<Input
										label='Técnico Responsable'
										name='cl_tecnico'
										id='cl_tecnico'
										complement=''
										method={register}
										errors={errors}
										isRequired={false}
									/>
								</fieldset>
								<fieldset>
									<Input
										label='Fecha Recepción'
										name='cl_fecha_recepcion'
										id='cl_fecha_recepcion'
										type='datetime-local'
										method={register}
										errors={errors}
									/>
								</fieldset>
							</ul>
							{/* Datos del Vehículo */}
							<ul className='flex flex-col gap-2'>
								<li className='h-8 text-center sm:text-left'>
									<h2 className='text-lg font-bold'>Datos del Vehículo</h2>
								</li>
								<div className='grid grid-cols-2 gap-4'>
									<Input
										label='Placa'
										name='v_placa'
										id='v_placa'
										method={register}
										errors={errors}
									/>
									<Input
										label='Kilometraje'
										name='v_kilometraje'
										id='v_kilometraje'
										type='number'
										method={register}
										errors={errors}
									/>
								</div>
								<div className='grid grid-cols-2 gap-4'>
									<Input
										label='Marca'
										name='v_marca'
										id='v_marca'
										method={register}
										errors={errors}
									/>
									<Input
										label='Color'
										name='v_color'
										id='v_color'
										method={register}
										errors={errors}
									/>
								</div>
								<div className='grid grid-cols-2 gap-4'>
									<Input
										label='Clave'
										name='v_clave'
										id='v_clave'
										method={register}
										errors={errors}
										isRequired={false}
									/>
									<Input
										label='Fecha Entrega'
										name='v_fecha_entrega'
										id='v_fecha_entrega'
										type='datetime-local'
										method={register}
										errors={errors}
										isRequired={false}
									/>
								</div>
								<div className='grid grid-cols-2 gap-4'>
									<Input
										label='Modelo'
										name='v_modelo'
										id='v_modelo'
										method={register}
										errors={errors}
										isRequired={false}
									/>
									<Input
										label='Año'
										name='v_anio'
										id='v_anio'
										type='number'
										method={register}
										errors={errors}
										isRequired={false}
									/>
								</div>
								<fieldset className='grid grid-cols-2 gap-4'>
									<Input
										label='Motor'
										name='v_motor'
										id='v_motor'
										method={register}
										errors={errors}
										isRequired={false}
									/>
									<Input
										label='Detalles'
										name='v_detalle'
										id='v_detalle'
										method={register}
										errors={errors}
										isRequired={false}
									/>
								</fieldset>
							</ul>
						</fieldset>
						<TextArea
							name='t_mecanica'
							label='Descripción del Trabajo a Realizar'
							method={register}
						/>
						<fieldset className='grid gap-10 mt-5 outline-none sm:grid-cols-[65%_1fr]'>
							<div>
								<header className='mb-3 text-center'>
									<h2 className='text-base text-lg font-bold'>Equipamento del Auto</h2>
								</header>
								<div className='grid grid-cols-2 mt-5 gap-x-3 sm:grid-cols-3'>
									{equipmentFields.map((equipment) => (
										<Checkbox
											key={equipment.id}
											id={equipment.id}
											name={equipment.name}
											method={register}
										/>
									))}
								</div>
							</div>
							<Auto
								register={register}
								errors={errors}
							/>
						</fieldset>
						<fieldset className='w-full mt-10 text-center'>
							<header className='text-center'>
								<h2 className='text-sm font-bold'>
									Autorizo a la empresa MerkautoEC a realizar pruebas de mi vehículo en la vía
									pública.
								</h2>
							</header>
							<div className='grid gap-10 pt-20 pb-12 sm:grid-cols-2'>
								<div className='grid justify-center gap-2'>
									<hr className='inline-block border border-gray-300 min-w-[13rem] sm:w-80' />
									<p className='text-sm'>Firma del Cliente</p>
								</div>
								<div className='grid justify-center gap-2'>
									<hr className='inline-block border border-gray-300 min-w-[13rem] sm:w-80' />
									<p className='text-sm'>Firma del Responsable</p>
								</div>
							</div>
						</fieldset>
						<fieldset className='flex justify-center gap-2 print:hidden'>
							<button
								type='submit'
								className='text-white bg-green-600 btn btn-success w-28'
								id='submit'
							>
								<i className='fas fa-save' />
								Guardar
							</button>
						</fieldset>
					</form>
				</section>
			</div>
		</>
	);
}

export default Order;
