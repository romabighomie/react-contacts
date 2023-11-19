import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import classNames from "classnames";
import {Flip, toast} from "react-toastify";
import AddContactForm from "../Form/AddContactForm";
import './_contacts.scss';

export default function Contacts() {
	const [contacts, setContact] = useState([]);
	const [formShowStatus, setFormShowStatus] = useState(false);
	
	const handleFormSubmit = (formData) => {
		const newContact = { ...formData, id: uuidv4() };
		setContact((prevContacts) => [...prevContacts, newContact]);
	};
	
	const showForm = (value) => {
		setFormShowStatus(value);
	}
	
	const handleRemoveContact = (id) => {
		toast.info('Contact removed', {
			autoClose: 1300,
			transition: Flip,
		})
		
		const updatedContacts = contacts.filter((contact) => contact.id !== id);
		setContact(updatedContacts);
	};

	return(
		<div className="contacts">
			
			<div className="contacts__table">
				<div className="contacts__row contacts__row--subtitles">
					<div className="contacts__subtitle">Name</div>
					<div className="contacts__subtitle">Surname</div>
					<div className="contacts__subtitle">Phone</div>
				</div>
				
				{contacts.map(item => {
					return(
						<div className="contacts__row" key={item.id}>
							<div className="contacts__col">{item.name}</div>
							<div className="contacts__col">{item.surname}</div>
							<div className="contacts__col">{item.phone}</div>
							<button
								className="contacts__col contacts__col--remove"
								onClick={() => handleRemoveContact(item.id)}
							>
								remove
							</button>
						</div>
					);
				})}

			</div>
			
			<div className={classNames('contacts__btn-wrapper', { 'hide': formShowStatus })}>
				<button
					className="contacts__add"
					onClick={() => {showForm(true)}}
				>
					Add new contact
				</button>
			</div>
			
			
			<div className={classNames('contacts__form', { 'show': formShowStatus })} >
				<AddContactForm onSubmit={handleFormSubmit} showForm={showForm}/>
			</div>

		</div>
	);
}