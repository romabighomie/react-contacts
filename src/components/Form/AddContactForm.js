import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import {toast, Flip} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './_form.scss';

export default function AddContactForm({onSubmit, showForm}) {
	
	const RegistrationSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'Too Short!')
			.max(10, 'Too Long!')
			.required('Required'),
		
		surname: Yup.string()
			.min(2, 'Too Short!')
			.max(10, 'Too Long!')
			.required('Required'),
		
		phone: Yup.string()
			.matches(/^(\+38)?\s?0\d{9}$/, 'Invalid phone number')
			.required('Required'),
	});
	
	const handleSubmit = (values, { resetForm }) => {
		toast.success('New contact', {
			autoClose: 1300,
			transition: Flip,
		})
		
		onSubmit(values);
		resetForm();
	}
	
	return(
		<>
			<Formik
				initialValues={{
					name: '',
					surname: '',
					phone: '+380',
				}}
				validationSchema={RegistrationSchema}
				onSubmit={handleSubmit}
			>
				{({ errors, touched }) => (
					<Form className='form'>
						
						<div className='form__title'>
							New contact
						</div>
						
						<div className="form__row">
							<Field
								className={classNames('form__item', { 'invalid': errors.name && touched.name })}
								id='name'
								name='name'
								placeholder='Name'
							/>
							{errors.name && touched.name ? (
								<div className='form__error'>{errors.name}</div>
							) : null}
						</div>
						
						<div className="form__row">
							<Field
								className={classNames('form__item', { 'invalid': errors.surname && touched.surname })}
								id='surname'
								name='surname'
								placeholder='Surname'
							/>
							{errors.surname && touched.surname ? (
								<div className='form__error'>{errors.surname}</div>
							) : null}
						</div>
						
						<div className="form__row">
							<Field
								className={classNames('form__item', { 'invalid': errors.phone && touched.phone })}
								id='phone'
								name='phone'
								placeholder='Phone number'
							/>
							{errors.phone && touched.phone ? (
								<div className='form__error'>{errors.phone}</div>
							) : null}
						</div>
						
						<div className='form__btn-wrapper'>
							<button
								className='form__btn'
								type='submit'
							>
								Save
							</button>
							
							<button
								className='form__btn form__btn--cancel'
								type='reset'
								onClick={() => {showForm(false)}}
							>
								Cancel
							</button>
						</div>
					
					</Form>
				)}
			
			</Formik>
		</>
	);
}