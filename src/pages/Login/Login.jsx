import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Forms/Input/Input';
import LoginPicture from '../../assets/images/auto/login.jpg';
import { sendXmlRequest } from '../../redux/slices/loginDataSlice';
import CoficImage from '../../assets/images/brand/logo_cofic.png';
import RysthImage from '../../assets/images/brand/logo_rysthdesign.png';

function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const dispatch = useDispatch();
	const navigator = useNavigate();

	const onSubmit = (data) => {
		data.servicio = 'LOGIN';
		dispatch(sendXmlRequest(data));
	};

	return (
		<section className='fixed inset-0'>
			<div className='grid sm:grid-cols-[1fr_1fr] lg:grid-cols-[65%_1fr] p-4 sm:p-0 h-full sm:relative sm:bg-white'>
				<picture className='absolute inset-0 bg-black sm:relative -z-10 sm:z-0'>
					<img
						src={LoginPicture}
						alt='Repairing cars'
						className='object-cover w-full h-full pointer-events-none grayscale'
					/>
				</picture>
				<div className='relative flex flex-col justify-center p-6 bg-white sm:p-4 rounded-xl sm:rounded-none max-w-[500px] min-w-[340px] sm:min-w-min sm:max-w-none mx-auto'>
					<form
						action='#'
						className='flex flex-col justify-center gap-10 p-4'
						onSubmit={handleSubmit(onSubmit)}
					>
						<fieldset className='mb-3 text-center'>
							<h2 className='text-4xl font-bold text-black'>Iniciar Sesión</h2>
						</fieldset>
						<ul className='grid gap-5 p-0 list-none'>
							<Input
								label='Correo Electrónico'
								name='email'
								id='email'
								type='email'
								complement='grid w-full'
								method={register}
								errors={errors}
							/>
							<Input
								label='Contraseña'
								name='password'
								id='password'
								type='password'
								complement='grid w-full'
								errors={errors}
								method={register}
							/>
							<li className='flex justify-center gap-2 print:hidden'>
								<button
									type='submit'
									className='text-white btn btn-primary'
									id='submit'
								>
									Iniciar Sesión
									<i className='fas fa-key' />
								</button>
							</li>
						</ul>
					</form>
					<footer className='absolute bottom-0 right-0 flex justify-between w-full p-5 mt-auto'>
						<div className='flex items-center justify-between w-full'>
							<a
								href='https://www.asvesot.com/'
								target='_blank'
								rel='noopener noreferrer'
								aria-label='Asvesot Website'
							>
								<img
									src={CoficImage}
									alt='Cofic logo'
									className='w-24'
								/>
							</a>
							<a
								href='https://rysthdesign.com/'
								target='_blank'
								rel='noopener noreferrer'
								aria-label='Rysthcraft Portfolio Website'
							>
								<img
									src={RysthImage}
									alt='Rysthcraft logo'
									className='w-[4rem]'
								/>
							</a>
						</div>
					</footer>
				</div>
			</div>
		</section>
	);
}

export default Login;
